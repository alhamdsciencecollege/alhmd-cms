import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
    Award, BookOpen, Building2, Bus, Calculator, ChevronDown, Clock, Cog, Cpu, Dumbbell, FlaskConical,
    GraduationCap, Heart, Laptop, Languages, Library, Microscope, Monitor, Palette, ShieldCheck, Sparkles, Star,
    Stethoscope, Trophy, Users, Wallet,
} from 'lucide-react'
import {cn} from '@/lib/utils'

// The icons the landing page can render, by the name stored in the database.
// The server sends the authoritative list of names; this map only supplies the
// component for each one (an unknown name falls back to a sparkle).
const ICONS = {
    Users, BookOpen, Star, ShieldCheck, GraduationCap, FlaskConical, Wallet, Stethoscope, Cog, Monitor, Cpu, Award,
    Heart, Clock, Library, Microscope, Trophy, Laptop, Calculator, Languages, Building2, Bus, Dumbbell, Palette,
}

export const NamedIcon = ({name, ...props}) => {
    const Icon = ICONS[name] || Sparkles
    return <Icon {...props}/>
}

/**
 * Icon dropdown that shows the icons themselves rather than their names.
 * Built on Radix's dropdown menu, so it opens in a portal (never clipped by a
 * card), handles keyboard and outside-click, and repositions on small screens.
 */
export default function IconPicker({label, value, options, onChange, error}) {
    return (
        <div className="space-y-1.5">
            <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-dark-400">
                {label}
            </span>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-2.5 text-sm dark:bg-dark-900',
                            'text-gray-900 transition-colors duration-150 dark:text-dark-100',
                            'focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500',
                            error
                                ? 'border-red-400 dark:border-red-500'
                                : 'border-gray-200 hover:border-gray-300 dark:border-dark-700 dark:hover:border-dark-600'
                        )}
                        aria-label={`${label}: ${value || 'none selected'}`}
                    >
                        <NamedIcon name={value} className="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400"/>
                        <span className="flex-1 truncate text-left">{value || 'Choose an icon'}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 dark:text-dark-500"/>
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align="start"
                        sideOffset={6}
                        collisionPadding={12}
                        className={cn(
                            'z-[70] w-[min(21rem,calc(100vw-1.5rem))] rounded-xl border p-2 shadow-xl',
                            'border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900',
                            'max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto'
                        )}
                    >
                        <div className="grid grid-cols-6 gap-1">
                            {options.map((name) => {
                                const selected = name === value
                                return (
                                    <DropdownMenu.Item
                                        key={name}
                                        onSelect={() => onChange(name)}
                                        title={name}
                                        aria-label={name}
                                        className={cn(
                                            'flex aspect-square cursor-pointer items-center justify-center rounded-lg outline-none transition-colors',
                                            'text-gray-600 dark:text-dark-300',
                                            'data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-dark-800',
                                            selected && 'bg-primary-500/10 text-primary-700 ring-2 ring-primary-500/40 dark:text-primary-400'
                                        )}
                                    >
                                        <NamedIcon name={name} className="h-5 w-5"/>
                                    </DropdownMenu.Item>
                                )
                            })}
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
        </div>
    )
}
