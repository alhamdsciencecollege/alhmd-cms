import {useEffect} from 'react'
import {createPortal} from 'react-dom'
import {cn} from '@/lib/utils'

/**
 * Mobile bottom sheet: dims the page, slides up from the bottom edge and
 * closes on backdrop tap or Escape. Always mounted so the close animates.
 */
export default function BottomSheet({open, onClose, title, children}) {
    useEffect(() => {
        if (!open) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = previous
            document.removeEventListener('keydown', onKey)
        }
    }, [open, onClose])

    return createPortal(
        <div className={cn('fixed inset-0 z-[60] md:hidden', !open && 'pointer-events-none')} aria-hidden={!open}>
            <div
                onClick={onClose}
                className={cn(
                    'absolute inset-0 bg-black/40 transition-opacity duration-300',
                    open ? 'opacity-100' : 'opacity-0'
                )}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cn(
                    'absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-[28px]',
                    'bg-card text-card-foreground shadow-2xl',
                    'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    open ? 'translate-y-0' : 'translate-y-full'
                )}
            >
                <div className="flex justify-center pt-3 pb-1">
                    <span className="h-1 w-10 rounded-full bg-muted-foreground/30"/>
                </div>
                <h2 className="px-5 pb-2 pt-1 text-lg font-bold tracking-tight">{title}</h2>
                <div
                    className="overflow-y-auto overscroll-contain px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
