export default function Footer() {
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
