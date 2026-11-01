import {Link, useLocation} from 'react-router-dom'
import {
    CalendarDotsIcon,
    ChartBarIcon,
    GraduationCapIcon,
    HouseIcon,
    UserCircleIcon,
    WalletIcon,
} from '@phosphor-icons/react'
import {cn} from '@/lib/utils'

const tabs = [
    {href: '/', label: 'Home', icon: HouseIcon},
    {href: '/timetable', label: 'Timetable', icon: CalendarDotsIcon},
    {href: '/fees', label: 'Fees', icon: WalletIcon},
    {href: '/marks', label: 'Marks', icon: GraduationCapIcon},
    {href: '/reports', label: 'Reports', icon: ChartBarIcon},
    {href: '/profile', label: 'Profile', icon: UserCircleIcon},
]

const SPRING = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'

/**
 * Flat, edge-to-edge tab bar. Neutral until selected; the selected tab gets
 * a filled icon, brand colour and a bar on the top edge that slides between
 * tabs as one element.
 */
export default function BottomNav() {
    const {pathname} = useLocation()
    const activeIndex = tabs.findIndex(t => t.href === pathname) // -1 off-bar

    return (
        <nav
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
        >
            <div className="relative mx-auto flex h-16 max-w-md">
                {/* Sliding top indicator */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-px left-0 flex justify-center transition-[transform,opacity] duration-500 motion-reduce:transition-none"
                    style={{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
                        opacity: activeIndex < 0 ? 0 : 1,
                        transitionTimingFunction: 'cubic-bezier(0.34,1.3,0.64,1)',
                    }}
                >
                    <span className="h-[3px] w-9 rounded-b-full bg-primary"/>
                </span>

                {tabs.map(({href, label, icon: Icon}) => {
                    const active = pathname === href
                    return (
                        <Link
                            key={href}
                            to={href}
                            aria-label={label}
                            aria-current={active ? 'page' : undefined}
                            className="group relative flex min-w-0 flex-1 select-none flex-col items-center justify-center gap-1 outline-none [-webkit-tap-highlight-color:transparent]"
                        >
                            <span
                                className={cn(
                                    'flex items-center justify-center rounded-xl p-1 transition-transform duration-500 motion-reduce:transition-none',
                                    'group-active:scale-90 group-focus-visible:ring-2 group-focus-visible:ring-primary',
                                    SPRING,
                                    active && '-translate-y-0.5 scale-110'
                                )}
                            >
                                <Icon
                                    size={26}
                                    weight={active ? 'fill' : 'regular'}
                                    className={cn(
                                        'transition-colors duration-300',
                                        active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                    )}
                                />
                            </span>
                            <span
                                className={cn(
                                    'max-w-full truncate text-[11px] leading-none transition-colors duration-300',
                                    active ? 'font-semibold text-primary' : 'font-medium text-muted-foreground'
                                )}
                            >
                                {label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
