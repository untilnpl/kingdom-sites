'use client'

import { useRef, useState } from 'react'

const TOPICS = ['Website / App', 'More info on South Asia', 'Other']

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const [topic, setTopic]           = useState(TOPICS[0])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [pending, setPending]       = useState(false)
  const formRef   = useRef<HTMLFormElement>(null)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4"
      style={{ background: 'rgba(0,0,0,0.50)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="flex w-full max-w-md flex-col rounded-2xl"
        style={{
          maxHeight: '90dvh',
          background: '#1a1f2e',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.40)',
        }}
      >
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

        <div className="overflow-y-auto overscroll-contain px-6 py-5">
          <iframe name="contact_modal_iframe" title="contact-modal" className="hidden"
            onLoad={() => {
              if (!pending) return
              setPending(false); setSubmitting(false); setSubmitted(true)
              formRef.current?.reset()
            }}
          />

          {submitted ? (
            <div className="rounded-xl border border-[#0071e3]/30 bg-[#0071e3]/15 p-5 text-center">
              <p className="text-sm font-semibold text-white">Message sent!</p>
              <p className="mt-1 text-sm text-white/55">I&apos;ll be in touch as soon as I can.</p>
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
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="topic" value={topic} />

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

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Name</span>
                <input required name="name" type="text" placeholder="Your name" autoComplete="name"
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12" />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-widest text-white/40">Email</span>
                <input required name="email" type="email" placeholder="you@example.com" autoComplete="email"
                  className="h-11 rounded-xl border border-white/10 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/25 transition focus:border-[#0071e3]/60 focus:bg-white/12" />
              </label>

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
