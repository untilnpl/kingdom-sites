export default function Mission() {
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
  <text x="50%" y="55%" text-anchor="middle" font-family="Inter, sans-serif" font-size="38" fill="#1d1d1f" fill-opacity="0.45">/images/bangladesh.jpeg</text>
</svg>`)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[28px] bg-[#0071e3]/10 blur-2xl" />
            <div className="glass overflow-hidden rounded-3xl">
              <img
                src="/images/southasia.jpg"
                alt="mission work"
                className="aspect-auto w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = photoFallback
                }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-[#1d1d1f]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            Our mission work
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
             The unreached world.
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-[#1d1d1f]/75 sm:text-lg">
            In South Asia, there are 1.8 billion people who have never heard the good news of Jesus Christ. Our desire is to see Jesus glorified in every area of South Asia. For security reasons I cannot share specific details about my work in South Asia but please reach out if you have any questions.
          </p>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#1d1d1f]/75">
            <p>
              We collaborate with Christians and have the goal of seeing movements of Christ among the Muslim majority people groups in South Asia. We subscribe and use the tools as presented by No Place Left.
            </p>
            <p>
              Your project fuels long-term mission work among people who have had little to no access to the gospel. Currently my fiancée and I are being trained to do ministry in South Asia. We want to be reach South Asia long term. 
            </p>
          </div>

          <div className="mt-8">
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
  )
}

