import { ReactNode } from 'react'
import { useUIStore } from '@/store/ui-store'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'
import { cn } from '@/lib/utils'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
