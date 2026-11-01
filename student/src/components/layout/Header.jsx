import {useEffect, useRef, useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {cn} from '@/lib/utils'
import {ChevronDown, LogOut, Moon, Sun, User} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Logo from '../../images/logo.png'
import UserAvatar from '@/components/shared/UserAvatar'
import {useTheme} from '@/hooks/useTheme'
import NotificationBell from './NotificationBell'

const breadcrumbMap = {
    '/': 'Dashboard',
    '/timetable': 'Timetable',
    '/fees': 'Fee Challans',
    '/marks': 'My Marks',
    '/reports': 'Reports',
    '/profile': 'My Profile',
}

export default function Header({title}) {
    const {user, logout} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const {isDark, toggleDark} = useTheme()

    const profileRoute = '/profile'

    const userName = user?.student?.name || 'User'
    const userEmail = user?.email || user?.student?.rollNumber || ''
    const userInitial = userName.charAt(0).toUpperCase()

    const rolePrefix = 'Student'
    const currentPage = breadcrumbMap[location.pathname] || title

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const roleLabelMap = {
        STUDENT: 'Student',
    }

    return (
        <header className="header-glass sticky top-0 z-50 px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6 md:py-3">
            <div className="flex items-center justify-between gap-4">
                {/* Left: Logo (mobile) + Breadcrumb (desktop) */}
                <div className="flex items-center gap-2.5">
                    {/* Brand — mobile only */}
                    <div className="md:hidden flex items-center">
                        <Link  to={'/'}>
                            <img src={Logo} alt="AHC" className=" h-11 object-contain"/>
                        </Link>
                    </div>

                    {/* Breadcrumb + Title — desktop only */}
                    <div className="hidden md:flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="capitalize font-medium">{rolePrefix}</span>
                            {currentPage && currentPage !== 'Dashboard' && (
                                <>
                                    <span className="text-muted-foreground/40">/</span>
                                    <span className="text-foreground/70 font-medium">{currentPage}</span>
                                </>
                            )}
                        </div>
                        <h1 className="text-xl font-bold text-foreground tracking-tight mt-0.5 truncate">
                            {title || currentPage}
                        </h1>
                    </div>
                </div>

                {/* Right: Search + Controls + Profile */}
                <div className="flex items-center gap-1 md:gap-2">

                    {/* Dark / Light toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDark}
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="relative h-10 w-10 md:h-9 md:w-9 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg"
                    >
                        {isDark
                            ? <Sun className="h-4 w-4"/>
                            : <Moon className="h-4 w-4"/>
                        }
                    </Button>

                    {/* Notifications — mobile only */}
                    <div className="md:hidden"><NotificationBell/></div>

                    {/* Separator — desktop only */}
                    <div className="hidden md:block h-6 w-px bg-border/60 mx-0.5"/>

                    {/* User Dropdown — desktop only */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            aria-label="Profile menu"
                            aria-expanded={dropdownOpen}
                            className={cn(
                                'flex items-center gap-2.5 h-10 md:h-9 pl-0.5 pr-1 rounded-lg transition-all duration-150',
                                'hover:bg-muted/60',
                                dropdownOpen && 'bg-muted/60'
                            )}
                        >
                            <UserAvatar name={userName} profilePicUrl={user?.profilePicUrl} size="sm" shape="rounded" className="shadow-sm" />
                            <div className="hidden sm:flex flex-col items-start">
                                <span className="text-xs font-semibold text-foreground leading-tight">{userName}</span>
                                <span className="text-[10px] text-muted-foreground leading-tight">
                                    {roleLabelMap[user?.role] || user?.role}
                                </span>
                            </div>
                            <ChevronDown className={cn(
                                'hidden md:block h-3 w-3 text-muted-foreground transition-transform duration-200',
                                dropdownOpen && 'rotate-180'
                            )}/>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-1.5 w-48 py-1.5 bg-popover border border-border/80 rounded-md shadow-xl shadow-black/8 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                                <div className="px-3 py-2.5 border-b border-border/60">
                                    <p className="text-sm font-semibold text-foreground">{userName}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{userEmail}</p>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false);
                                            navigate(profileRoute)
                                        }}
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-foreground/80 hover:bg-muted/60 transition-colors"
                                    >
                                        <User className="h-3.5 w-3.5 text-muted-foreground"/>
                                        View profile
                                    </button>
                                </div>
                                <div className="border-t border-border/60 pt-1">
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-3.5 w-3.5"/>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
