import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase.js'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Mission from './pages/Mission.jsx'
import WhyUs from './pages/WhyUs.jsx'

const NAV_LINKS = [
  { to: '/about',   label: 'About' },
  { to: '/mission', label: 'Our Mission' },
  { to: '/why-us',  label: 'Why Kingdom Sites' },
]

// Defined once at module level so the object reference is stable across renders.
const GLASS_HEADER = {
  background: 'rgba(232, 238, 247, 0.85)',
  backdropFilter: 'blur(20px) saturate(130%)',
  WebkitBackdropFilter: 'blur(20px) saturate(130%)',
}

function MenuIcon() {
  return (
    // aria-hidden: this icon is decorative — the button has an aria-label instead.
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function Header() {
  const location = useLocation()
  const [user, setUser]         = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkBg, setDarkBg]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef               = useRef(null)

  // Detects when the header scrolls over a dark section (data-dark-section attribute)
  // so we can flip nav text to white for contrast/readability.
  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > 8)
      const headerHeight = headerRef.current?.offsetHeight ?? 56
      const sections = document.querySelectorAll('[data-dark-section]')
      let over = false
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top < headerHeight && r.bottom > 0) { over = true; break }
      }
      setDarkBg(over)
    }
    // passive: true — tells the browser this listener won't call preventDefault(),
    // allowing scroll to be handled on a separate thread for better performance.
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [location.pathname])

  // Subscribe to Supabase auth state so the header updates immediately
  // when the user logs in or out on any tab — no page refresh needed.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    // Clean up the auth listener when the component unmounts to prevent memory leaks.
    return () => subscription.unsubscribe()
  }, [])

  const isActive = (path) => location.pathname === path

  const textColor    = darkBg ? 'text-white'     : 'text-[#1d1d1f]'
  const mutedColor   = darkBg ? 'text-white/65'  : 'text-[#1d1d1f]/60'
  const hoverColor   = darkBg ? 'hover:text-white' : 'hover:text-[#0071e3]'
  const activeColor  = darkBg ? 'text-white'     : 'text-[#1d1d1f]'
  const accountColor = darkBg ? 'text-white/80'  : 'text-[#1d1d1f]/80'
  const burgerColor  = darkBg ? 'text-white/80'  : 'text-[#1d1d1f]/70'

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* Main bar — glass effect only kicks in after user scrolls 8px,
          so the top of the page feels clean and open. */}
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled ? GLASS_HEADER.background : 'transparent',
          backdropFilter: scrolled ? GLASS_HEADER.backdropFilter : 'none',
          WebkitBackdropFilter: scrolled ? GLASS_HEADER.WebkitBackdropFilter : 'none',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">

          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-5">
            <Link to="/" className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${textColor}`}>
              Kingdom Sites
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to} to={to}
                  className={`text-sm font-medium transition-colors duration-300 ${isActive(to) ? activeColor : `${mutedColor} ${hoverColor}`}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: desktop buttons.
              - Dashboard button is hidden when already on /dashboard (no redundant link).
              - "Get Started" is hidden when logged in (already have an account). */}
          <div className="hidden sm:flex items-center gap-2">
            {!isActive('/dashboard') && (
              <Link
                to={user ? '/dashboard' : '/login'}
                className={`rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-300 hover:bg-white/40 ${accountColor}`}
              >
                {user ? 'Dashboard' : 'Your Account'}
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile: hamburger — aria-label describes the action for screen readers. */}
          <button
            className={`sm:hidden flex h-9 w-9 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm transition-colors duration-300 hover:bg-white/35 ${burgerColor}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu — same auth-aware logic as desktop. */}
      {menuOpen && (
        <div
          className="sm:hidden"
          style={{ ...GLASS_HEADER, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to} to={to}
                  // Close the menu on navigation so it doesn't stay open on the new page.
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive(to)
                      ? 'bg-white/30 text-[#1d1d1f]'
                      : 'text-[#1d1d1f]/70 hover:bg-white/20'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/20 pt-3">
              {!isActive('/dashboard') && (
                <Link
                  to={user ? '/dashboard' : '/login'}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-center text-sm font-medium text-[#1d1d1f]/80 transition hover:bg-white/35"
                >
                  {user ? 'Dashboard' : 'Your Account'}
                </Link>
              )}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-[#0071e3] px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer
      className="border-t border-white/30"
      style={{
        background: 'rgba(200, 220, 248, 0.30)',
        backdropFilter: 'blur(48px) saturate(200%)',
        WebkitBackdropFilter: 'blur(48px) saturate(200%)',
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-center text-xs text-[#1d1d1f]/55 sm:px-6">
        <p>Kingdom Sites — premium sites with mission impact.</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

const TOPICS = ['Website / App', 'More info on South Asia', 'Other']

function ContactModal({ onClose }) {
  const [topic, setTopic]           = useState(TOPICS[0])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  // pending tracks whether a form submission is in-flight so we ignore
  // the iframe's initial onLoad fire (which happens on mount, not on submit).
  const [pending, setPending]       = useState(false)
  const formRef   = useRef(null)
  const iframeRef = useRef(null)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4"
      style={{ background: 'rgba(0,0,0,0.50)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Solid dark card — full contrast, no frosting, no transparency confusion */}
      <div
        className="flex w-full max-w-md flex-col rounded-2xl"
        style={{
          maxHeight: '90dvh',
          background: '#1a1f2e',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.40)',
        }}
      >
        {/* Header — always visible, never clipped */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-white">Get in touch</h2>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/70"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto overscroll-contain px-6 py-5">

          <iframe ref={iframeRef} name="contact_modal_iframe" title="contact-modal" className="hidden"
            onLoad={() => {
              if (!pending) return
              setPending(false); setSubmitting(false); setSubmitted(true)
              formRef.current?.reset()
            }}
          />

          {submitted ? (
            <div className="rounded-xl border border-[#0071e3]/30 bg-[#0071e3]/15 p-5 text-center">
              <p className="text-sm font-semibold text-white">Message sent!</p>
              <p className="mt-1 text-sm text-white/55">I'll be in touch as soon as I can.</p>
              <button onClick={() => setSubmitted(false)} className="mt-3 text-xs text-[#0071e3]">Send another</button>
            </div>
          ) : (
            <form
              ref={formRef}
              action="https://formsubmit.co/untilnpl@gmail.com"
              method="POST"
              target="contact_modal_iframe"
              className="grid gap-4"
              onSubmit={() => { setSubmitting(true); setPending(true) }}
            >
              <input type="hidden" name="_subject" value={`New inquiry: ${topic}`} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />
              <input type="hidden" name="topic" value={topic} />

              {/* Topic selector */}
              <div className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Topic</span>
                <div className="flex flex-col gap-1.5">
                  {TOPICS.map((t) => (
                    <label key={t} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                      topic === t
                        ? 'border-[#0071e3]/50 bg-[#0071e3]/20 text-white'
                        : 'border-white/8 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80'
                    }`}>
                      <input type="radio" name="topic_select" value={t} checked={topic === t}
                        onChange={() => setTopic(t)} className="sr-only" />
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${topic === t ? 'bg-[#0071e3]' : 'bg-white/20'}`} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name */}
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Name</span>
                <input required name="name" type="text" placeholder="Your name" autoComplete="name"
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12" />
              </label>

              {/* Email */}
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Email</span>
                <input required name="email" type="email" placeholder="you@example.com" autoComplete="email"
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12" />
              </label>

              {/* Message */}
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Message</span>
                <textarea required name="message" rows={3} placeholder="Tell us a bit more…"
                  className="resize-none rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12" />
              </label>

              <button type="submit" disabled={submitting}
                className="h-11 rounded-xl bg-[#0071e3] text-sm font-semibold text-white transition hover:bg-[#0071e3]/90 disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function AppShell() {
  const [contactOpen, setContactOpen] = useState(false)
  const location = useLocation()
  const onDashboard = location.pathname === '/dashboard'

  // Listen for a custom DOM event dispatched by any page component.
  // This avoids prop drilling or global state just to open a modal —
  // any button anywhere can do: document.dispatchEvent(new CustomEvent('open-contact-modal'))
  useEffect(() => {
    const handler = () => setContactOpen(true)
    document.addEventListener('open-contact-modal', handler)
    return () => document.removeEventListener('open-contact-modal', handler)
  }, [])

  return (
    <div className="min-h-dvh text-[#1d1d1f]">
      <Header />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/mission"   element={<Mission />} />
          <Route path="/login"     element={<Login />} />
          {/* /dashboard is protected — Dashboard.jsx redirects to /login if no session. */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/why-us"    element={<WhyUs />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating contact button — hidden on dashboard so it doesn't overlap the portal UI. */}
      {!onDashboard && (
        <button
          onClick={() => setContactOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-[#0071e3] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-95 active:brightness-90"
          style={{ boxShadow: '0 2px 8px rgba(0,113,227,0.25)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7l-4 3V6a2 2 0 0 1 2-2z"/>
          </svg>
          Contact
        </button>
      )}

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  )
}

export default function App() {
  return (
    // BrowserRouter enables client-side routing. vercel.json rewrites all paths
    // to index.html so deep links (e.g. /dashboard) work on hard refresh.
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
