import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7F5] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center py-16">
        <p className="font-script text-3xl text-[#8B6F47] mb-6" style={{ fontFamily: 'var(--font-script), cursive' }}>
          Makeovers by Bhuvita
        </p>
        <p className="text-7xl font-bold text-[#D4A574] mb-4" aria-hidden="true">404</p>
        <h1 className="text-2xl font-semibold text-[#5C4033] mb-3">Page not found</h1>
        <p className="text-[#8B6F47] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or the link may be incomplete.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#8B6F47] text-white font-medium hover:bg-[#5C4033] transition-colors"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/917888808231?text=Hi%20Bhuvita!%20I%27m%20looking%20for%20bridal%20makeup."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full border-2 border-[#8B6F47] text-[#8B6F47] font-medium hover:bg-[#F5E6D3] transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
