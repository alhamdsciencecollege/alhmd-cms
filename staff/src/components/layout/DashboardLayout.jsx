import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout({ children, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Lock background scroll while the mobile menu is open — otherwise a
    // touch drag on the overlay can scroll the page behind it instead of
    // (or alongside) the menu itself.
    useEffect(() => {
        if (!mobileMenuOpen) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = previous }
    }, [mobileMenuOpen])

    return (
        <div className="flex h-screen bg-[hsl(var(--background))] overflow-hidden">
            <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header
                    title={title}
                    onMenuToggle={() => setMobileMenuOpen(o => !o)}
                    mobileMenuOpen={mobileMenuOpen}
                />
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                    <div className="p-2 sm:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
