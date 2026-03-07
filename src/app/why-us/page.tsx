'use client'

import { useEffect, useRef } from 'react'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal-card w-full rounded-2xl p-4 sm:p-6 lg:p-8 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transitionDelay: `${delay}ms`,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal-card w-full rounded-2xl p-4 sm:p-5 text-center"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transitionDelay: `${delay}ms`,
        boxSizing: 'border-box',
      }}
    >
      <p className="text-xl font-semibold tracking-tight text-[#0071e3] sm:text-2xl lg:text-3xl">{value}</p>
      <p className="mt-1 text-xs leading-snug text-[#1d1d1f]/55 sm:text-sm">{label}</p>
    </div>
  )
}

export default function WhyUs() {
  const heroRef = useRef<HTMLElement>(null)
  const heroInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = heroRef.current
    const inner = heroInnerRef.current
    if (!section || !inner) return
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const entry = Math.max(0, Math.min(1, (vh - rect.top) / vh))
      inner.style.transform = `translateY(${(1 - entry) * 50}px)`
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section ref={heroRef} className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div ref={heroInnerRef} style={{ willChange: 'transform' }}>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#1d1d1f]/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Why Kingdom Sites
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
            Your church deserves a website that works as hard as your ministry.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-5 sm:text-base">
            First impressions often happen online. A clear, fast, functional website can enable seekers to find you and learn more about your church.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard value="81%"  label="of people research a church online before visiting"  delay={0}   />
          <StatCard value="$499" label="flat rate build — or overhaul. No surprises."         delay={80}  />
          <StatCard value="$50"  label="per month — unlimited updates, hosting & maintenance" delay={160} />
          <StatCard value="100%" label="focused on American culture, gospel centered"          delay={240} />
        </div>
      </section>

      {/* Why quality matters */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard>
          <h2 className="mb-3 text-xl font-semibold tracking-tight sm:mb-4 sm:text-2xl lg:text-3xl">
            Why a quality website matters for your church.
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[#1d1d1f]/60">
            Most church websites were built years ago, load slowly, and look dated on mobile.
            That matters — because most visitors decide whether to show up based on the statement of faith and your location. It is imperative you have a quality, fast website. In fact even when I have looked for churches in the past when I am traveling, if their website is not clear on location, time, and statement of faith — or if it is so buggy I can&apos;t use it I will look for a different church.
          </p>
          <p className="mb-6 text-sm leading-relaxed text-[#1d1d1f]/60">
            A well-built site communicates that your church is alive, organized, and welcoming.
            It removes friction for new families, makes your service times instantly findable,
            and gives your ministry the professional credibility it deserves.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { title: 'Mobile-first',    desc: 'Over 70% of church site visits happen on a phone. Every site I build looks great on every screen.' },
              { title: 'Fast by design',  desc: 'Slow sites lose visitors in seconds. Performance is built in from the start, not bolted on later.' },
              { title: 'Easy to update',  desc: "You shouldn't need a developer to change your sermon series or add an event. I build for simplicity." },
            ].map((item) => (
              <div
                key={item.title}
                className="min-w-0 rounded-xl p-4"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <p className="mb-1 text-sm font-semibold">{item.title}</p>
                <p className="break-words text-sm leading-relaxed text-[#1d1d1f]/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealCard>
      </section>

      {/* Unique position */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          <RevealCard delay={0}>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#0071e3]/70">The Kingdom Sites difference</p>
            <h3 className="mb-3 text-lg font-semibold tracking-tight sm:text-xl">
              South Asia costs. American quality.
            </h3>
            <p className="text-sm leading-relaxed text-[#1d1d1f]/60">
              We live and serve in South Asia, where the cost of living is a
              fraction of the US — which means I can offer premium, American-standard
              development at a price most church budgets can actually handle — without
              cutting any corners.
            </p>
          </RevealCard>

          <RevealCard delay={100}>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#0071e3]/70">Cultural fluency</p>
            <h3 className="mb-3 text-lg font-semibold tracking-tight sm:text-xl">
              I understand your church.
            </h3>
            <p className="text-sm leading-relaxed text-[#1d1d1f]/60">
              I grew up in American evangelical culture and understand how churches
              communicate, what matters to your congregation, and what visitors need
              to see. I write copy, choose layouts, and think through your site the
              way an insider would — not a generic overseas contractor.
            </p>
          </RevealCard>
        </div>
      </section>

      {/* Partnership */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16 lg:pb-20">
        <RevealCard>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#0071e3]/70">A partnership with eternal stakes</p>
            <h2 className="mb-3 text-xl font-semibold tracking-tight sm:mb-4 sm:text-2xl lg:text-3xl">
              Your church empowers ours.
            </h2>
            <p className="text-sm leading-relaxed text-[#1d1d1f]/60 sm:text-base">
              When you commission a site, you&apos;re not just investing in your ministry —
              you&apos;re directly funding our family&apos;s church-planting work among unreached
              peoples in South Asia. Your church grows its online presence, and the gospel
              advances in some of the world&apos;s least-reached places. That&apos;s a partnership
              worth being part of.
            </p>
          </div>
        </RevealCard>
      </section>

      {/* Convictions */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:pb-28">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">Who we work with.</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/55 sm:mt-3">
            We collaborate with anyone but focus building relationships with on-profit churches and ministries.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Bible-believing churches',
              desc: 'We hold the Scriptures as the fully inspired, inerrant, and authoritative Word of God — the only rule for faith and practice.',
            },
            {
              title: 'All evangelical traditions',
              desc: "Baptist, Reformed, Anglican, non-denominational — if you love the gospel and the local church, we'd be honored to work with you.",
            },
            {
              title: 'Mission-minded ministries',
              desc: 'We especially love serving churches but also any organization that is trying to reach the lost for Christ.',
            },
          ].map((item, i) => (
            <RevealCard key={item.title} delay={i * 90}>
              <h3 className="mb-2 text-sm font-semibold tracking-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#1d1d1f]/55">{item.desc}</p>
            </RevealCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
          >
            Start a conversation
          </button>
        </div>
      </section>
    </div>
  )
}
