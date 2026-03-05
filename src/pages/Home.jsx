import { useRef, useState } from 'react'

export default function Home() {
  const profileFallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5f7ff"/>
      <stop offset="0.55" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f3f9ff"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="20%" r="80%">
      <stop offset="0" stop-color="#0071e3" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#0071e3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="900" height="900" fill="url(#g)"/>
  <rect width="900" height="900" fill="url(#r)"/>
  <circle cx="450" cy="390" r="128" fill="#1d1d1f" fill-opacity="0.08"/>
  <path d="M210 760c60-150 165-220 240-220s180 70 240 220" fill="#1d1d1f" fill-opacity="0.08"/>
  <text x="50%" y="86%" text-anchor="middle" font-family="Inter, sans-serif" font-size="32" fill="#1d1d1f" fill-opacity="0.45">/images/couple.jpeg</text>
</svg>`)

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [pendingSubmit, setPendingSubmit] = useState(false)
  const formRef = useRef(null)

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
              $499 flat rate — or overhaul
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Professional Websites that support Kingdom work in the most unreached places.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
              American-standard development at unbeatable prices.
              Supporting mission work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-[#0071e3] hover:bg-[#f5f5f7] hover:text-[#0071e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                Build Now
              </button>
              <a
                href="#value"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
              >
                What You Get
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
              <div className="glass overflow-hidden rounded-3xl">
                <img
                  src="/images/couple.jpeg"
                  alt="Photo"
                  className="aspect-square w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = profileFallback
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="value"
        aria-label="Value proposition"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built like a premium product.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/70 sm:text-lg">
              American website level quality with unbeatable prices. Direct
              impact to mission work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {[
              {
                title: 'Built for Christians, by Christians',
                desc: 'We believe God has given us work as a way to glorify Him and serve others. We would love to help your ministry achieve its tech goals for the glory of God.',
              },
              {
                title: '$499 flat rate — or overhaul',
                desc: 'South Asia costs of living mean we can offer American-standard development at a price your church budget can handle — no retainers, no surprises.',
              },
              {
                title: '$50 / month — your personal IT support',
                desc: 'Church event coming up? Need a page updated? Want to add a new feature? Just message me. Unlimited updates and maintenance included for $50/month — forever.',
              },
              {
                title: 'Direct mission impact',
                desc: 'Your project funds our ministry work in South Asia. You\'re not just getting a great website — you\'re investing in something that has an eternal impact.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass rounded-3xl p-6"
              >
                <h3 className="text-sm font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section aria-label="Pricing" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, honest pricing.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/65">
            One flat rate to build it right. One low monthly rate to keep it that way.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
          {/* Website Build */}
          <div className="glass rounded-3xl p-7 flex flex-col">
            <p className="text-xs font-medium uppercase tracking-widest text-[#0071e3]/80 mb-3">One-time</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-semibold tracking-tight">$499</span>
            </div>
            <p className="text-sm font-medium mb-4">Website Build</p>
            <ul className="grid gap-2 mb-6 flex-1">
              {[
                'Custom-designed',
                'Fast performance, built from scratch',
                'Fully handed off — you own it',
                'Direct personal communication throughout',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/70">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center text-[10px] font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="w-full cursor-pointer rounded-full bg-[#0071e3] py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              Get started — $499
            </button>
          </div>

          {/* Care plan */}
          <div className="glass rounded-3xl p-7 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 rounded-full bg-[#0071e3] px-3 py-1 text-[10px] font-semibold text-white">
              First month free
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#0071e3]/80 mb-3">Monthly</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-semibold tracking-tight">$50</span>
              <span className="text-sm text-[#1d1d1f]/55 mb-1">/month</span>
            </div>
            <p className="text-sm font-medium mb-4">Care &amp; Maintenance</p>
            <ul className="grid gap-2 mb-6 flex-1">
              {[
                'Unlimited updates — just message me',
                'Church events, new pages, copy changes',
                'Your personal website IT support',
                'Cancel any time',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/70">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center text-[10px] font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="w-full cursor-pointer rounded-full border border-[#0071e3] py-3 text-center text-sm font-semibold text-[#0071e3] transition hover:bg-[#0071e3] hover:text-white"
            >
              Start free — then $50/mo
            </button>
          </div>

          {/* Custom App */}
          <div className="glass rounded-3xl p-7 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 rounded-full bg-[#1d1d1f] px-3 py-1 text-[10px] font-semibold text-white">
              App + Custom Features
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#0071e3]/80 mb-3">One-time</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-semibold tracking-tight">Quote Needed</span>
            </div>
            <p className="text-sm font-medium mb-4">Custom App Build</p>
            <ul className="grid gap-2 mb-6 flex-1">
              {[
                'Full custom web or mobile app',
                'Built to your exact specifications',
                'Direct communication throughout',
                'Fully handed off — you own it',
              ].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#1d1d1f]/70">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#0071e3]/15 text-[#0071e3] flex items-center justify-center text-[10px] font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="w-full cursor-pointer rounded-full border border-[#1d1d1f]/30 py-3 text-center text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#1d1d1f] hover:text-white"
            >
              Let's talk!
            </button>
          </div>
        </div>

      </section>

      <section
        id="contact"
        aria-label="Contact"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Let’s build your site.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-[#1d1d1f]/70 sm:text-lg">
              Drop your details below and I'll be in touch.
            </p>
          </div>

          <div className="glass mx-auto mt-10 max-w-2xl rounded-3xl p-6">
              <iframe
                title="contact-submit"
                name="contact_iframe"
                className="hidden"
                onLoad={() => {
                  if (!pendingSubmit) return
                  setPendingSubmit(false)
                  setSubmitting(false)
                  setSubmitted(true)
                  formRef.current?.reset()
                }}
              />
              {submitted ? (
                <div className="py-6 text-center">
                  <p className="text-sm font-semibold tracking-tight">
                    Message queued.
                  </p>
                  <p className="mt-2 text-sm text-[#1d1d1f]/70">
                    Thanks—I'll reply as soon as I can. If you don’t see it, check
                    spam (first-time verification can also happen).
                  </p>
                </div>
              ) : (
                <form
                  className="grid gap-4"
                  ref={formRef}
                  action="https://formsubmit.co/untilnpl@gmail.com"
                  method="POST"
                  target="contact_iframe"
                  onSubmit={() => {
                    setSubmitting(true)
                    setPendingSubmit(true)
                  }}
                >
                  <input type="hidden" name="_subject" value="New Kingdom Sites inquiry" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />

                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="grid gap-1 text-sm">
                      <span className="font-medium text-[#1d1d1f]/80">
                        Name
                      </span>
                      <input
                        required
                        name="name"
                        className="h-11 rounded-2xl border border-white/30 bg-white/20 px-4 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="grid gap-1 text-sm">
                      <span className="font-medium text-[#1d1d1f]/80">
                        Email
                      </span>
                      <input
                        required
                        name="email"
                        type="email"
                        className="h-11 rounded-2xl border border-white/30 bg-white/20 px-4 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1 text-sm">
                    <span className="font-medium text-[#1d1d1f]/80">
                      What do you need built?
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="resize-none rounded-2xl border border-white/30 bg-white/20 px-4 py-3 text-sm backdrop-blur outline-none ring-[#0071e3]/20 transition focus:bg-white/35 focus:ring-4"
                      placeholder="One-page landing, multi-page site, redesign, etc."
                    />
                  </label>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#1d1d1f]/55">
                      I'll reply as soon as possible.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-[#0071e3] hover:bg-[#f5f5f7] hover:text-[#0071e3] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3]"
                    >
                      {submitting ? 'Sending…' : 'Send'}
                    </button>
                  </div>
                </form>
              )}
          </div>
        </div>
      </section>
    </div>
  )
}
