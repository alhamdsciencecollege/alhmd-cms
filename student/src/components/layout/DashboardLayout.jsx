import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

export default function DashboardLayout({ children, title }) {
    return (
        <div className="flex h-dvh bg-[hsl(var(--background))] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header title={title} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
                    <div className="p-3 sm:p-6">
                        {children}
                    </div>
                </main>
            </div>
            <BottomNav />
        </div>
    )
}
