export const metadata = {
  title: 'Terms of Service — Kingdom Sites',
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold text-[#1d1d1f]">Terms of Service</h1>
      <p className="mb-10 text-sm text-[#1d1d1f]/50">Last updated: March 7, 2026</p>

      <section className="space-y-8 text-sm leading-relaxed text-[#1d1d1f]/80">
        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Acceptance of Terms</h2>
          <p>
            By accessing this website or purchasing our products, you agree to these terms.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Products and Services</h2>
          <p>We provide digital products and services through this website.</p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Payments</h2>
          <p>
            All payments are processed through Lemon Squeezy, our authorized merchant of record.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Refund Policy</h2>
          <p>
            Refunds are provided according to our refund policy or as required by Lemon Squeezy.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Intellectual Property</h2>
          <p>
            All content on this website, including code, design, and text, is the property of
            Kingdom Sites and may not be reproduced without permission.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Limitation of Liability</h2>
          <p>
            We are not responsible for damages arising from the use of our products or website.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the website constitutes
            acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-[#1d1d1f]">Contact</h2>
          <p>
            For questions regarding these terms, contact Thomas Klein at{' '}
            <a
              href="mailto:thomas@kleinsonline.org"
              className="underline underline-offset-2 hover:text-[#1d1d1f]"
            >
              thomas@kleinsonline.org
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
