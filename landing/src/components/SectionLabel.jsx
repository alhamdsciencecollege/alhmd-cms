export default function SectionLabel({ children, tone = 'primary' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : 'text-primary'
  return (
    <div className="flex items-center gap-3">
      <div className="h-[3px] w-10 rounded-full bg-accent" />
      <span className={`font-body text-sm font-semibold tracking-wide ${toneClass}`}>
        {children}
      </span>
    </div>
  )
}
