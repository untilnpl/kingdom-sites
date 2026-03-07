'use client'

const photoFallback =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
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
  <rect width="1200" height="1200" fill="url(#g)"/>
  <rect width="1200" height="1200" fill="url(#r)"/>
  <text x="50%" y="55%" text-anchor="middle" font-family="Inter, sans-serif" font-size="38" fill="#1d1d1f" fill-opacity="0.45">/images/about.jpg</text>
</svg>`)

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
            <div className="glass overflow-hidden rounded-3xl">
              <img
                src="/Photos/about.jpg"
                alt="Us"
                className="w-full h-auto object-contain"
                onError={(e) => { e.currentTarget.src = photoFallback }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            About
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A little bit about us.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
            My name is Thomas Klein and I am a Jesus follower. I am engaged to Monisha my fiancée and we are both passionate about seeing Jesus glorified in every area of the world.
            We want this business to be an extension of our ministry as we desire to build relationships and network with Christians everywhere. We are very personal people and we may find ourselves building a new relationship regardless of whether or not we build your website!
          </p>

          <div className="mt-8 grid gap-4">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-sm font-semibold tracking-tight">What I focus on</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/70">
                I focus on building websites and apps that are fast, clean, mobile-friendly, and easy to maintain.
              </p>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-sm font-semibold tracking-tight">Why &quot;Kingdom Sites&quot;</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]/70">
                When you build a website with Kingdom Sites, you are not just getting a website, you are getting a partner in your ministry. We desire to see many churches and organizations thrive and reach many people for Christ.
                We believe that technology can accelerate the spread of the good news and we want to be a part of that.
              </p>
            </div>

            <div className="mt-2">
              <button
                onClick={() => document.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
              >
                Build Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
