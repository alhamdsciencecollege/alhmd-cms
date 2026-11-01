import {useCallback, useEffect, useState} from 'react'
import {Bell, Megaphone} from 'lucide-react'
import {announcementsAPI} from '@/services/api'
import {cn} from '@/lib/utils'
import BottomSheet from './BottomSheet'

const SEEN_KEY = 'announcementsSeenAt'

const readSeen = () => {
    try {
        return Number(localStorage.getItem(SEEN_KEY)) || 0
    } catch {
        return 0
    }
}

const stamp = (a) => new Date(a.publishedAt || a.createdAt).getTime()

function timeAgo(ts) {
    const s = (Date.now() - ts) / 1000
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    if (s < 604800) return `${Math.floor(s / 86400)}d ago`
    return new Date(ts).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
}

/** Bell for the mobile top bar. Opens announcements as a bottom sheet. */
export default function NotificationBell() {
    const [items, setItems] = useState([])
    const [seenAt, setSeenAt] = useState(readSeen)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        let cancelled = false
        announcementsAPI.getAll()
            .then(res => {
                if (cancelled) return
                const list = res.data?.announcements || res.data || []
                setItems([...list].sort((a, b) => stamp(b) - stamp(a)))
            })
            .catch(() => {})
        return () => {
            cancelled = true
        }
    }, [])

    const hasUnread = items.some(a => stamp(a) > seenAt)

    const close = useCallback(() => {
        setOpen(false)
        const now = Date.now()
        try {
            localStorage.setItem(SEEN_KEY, String(now))
        } catch { /* storage unavailable */ }
        setSeenAt(now)
    }, [])

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={hasUnread ? 'Notifications, new' : 'Notifications'}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground active:bg-muted focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
                <Bell className="h-[22px] w-[22px]"/>
                {hasUnread && (
                    <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-red-500"/>
                )}
            </button>

            <BottomSheet open={open} onClose={close} title="Notifications">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                        <Megaphone className="h-8 w-8 text-muted-foreground/50"/>
                        <p className="text-sm font-medium">You're all caught up</p>
                        <p className="text-xs text-muted-foreground">New announcements from the college will show up here.</p>
                    </div>
                ) : (
                    <ul className="space-y-1">
                        {items.map(a => (
                            <li key={a.id} className="flex gap-3 rounded-2xl px-3 py-3">
                                <span
                                    className={cn(
                                        'mt-1.5 h-2 w-2 flex-shrink-0 rounded-full',
                                        stamp(a) > seenAt ? 'bg-primary' : 'bg-transparent'
                                    )}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold leading-snug">{a.title}</p>
                                    {a.content && (
                                        <p className="mt-0.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{a.content}</p>
                                    )}
                                    <p className="mt-1 text-[11px] text-muted-foreground/80">{timeAgo(stamp(a))}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </BottomSheet>
        </>
    )
}
