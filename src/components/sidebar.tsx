import { Link, useLocation } from 'react-router-dom'
import {
  Building2,
  Ticket,
  Search,
  Wrench,
  Users,
  FileText,
  Settings,
  Calendar,
  FolderOpen,
  BarChart3,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent } from '@/components/ui/sheet'

const navigation = [
  { name: 'Chat IA', href: ROUTES.HOME, icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Edificios', href: ROUTES.BUILDINGS, icon: Building2 },
  { name: 'Unidades', href: ROUTES.UNITS, icon: Home },
  { name: 'Tickets', href: ROUTES.TICKETS, icon: Ticket },
  { name: 'Inspecciones', href: ROUTES.INSPECTIONS, icon: Search },
  { name: 'Órdenes de Trabajo', href: ROUTES.WORKORDERS, icon: Wrench },
  { name: 'Proveedores', href: ROUTES.VENDORS, icon: Users },
  { name: 'Facturas', href: ROUTES.INVOICES, icon: FileText },
  { name: 'Mantenimiento', href: ROUTES.MAINTENANCE, icon: Settings },
  { name: 'Reuniones', href: ROUTES.MEETINGS, icon: Calendar },
  { name: 'Documentos', href: ROUTES.DOCUMENTS, icon: FolderOpen },
]

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation()
  const { user } = useAuthStore()
  const { toggleSidebarCollapsed } = useUIStore()

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          'flex h-16 items-center',
          collapsed ? 'justify-center px-3' : 'px-6'
        )}
      >
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          {!collapsed && <span className="text-xl font-bold">Consorcios</span>}
        </div>
        {!collapsed ? (
          <button
            onClick={toggleSidebarCollapsed}
            className="ml-auto rounded-md p-1 hover:bg-accent"
            title="Colapsar sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={toggleSidebarCollapsed}
            className="absolute -right-3 top-4 rounded-full border bg-background p-1 shadow-md hover:bg-accent"
            title="Expandir sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className={cn('flex-1 space-y-1 py-4', collapsed ? 'px-2' : 'px-4')}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center rounded-md py-2 text-sm font-medium transition-colors',
                collapsed ? 'justify-center px-2' : 'px-2',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  collapsed ? 'mr-0' : 'mr-3',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                )}
              />
              {!collapsed && item.name}
            </Link>
          )
        })}
      </nav>

      <div className={cn('border-t p-4', collapsed && 'flex justify-center')}>
        <div
          className={cn(
            'flex items-center',
            collapsed ? 'justify-center' : 'space-x-3'
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-medium text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useUIStore()

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          'hidden transition-all duration-300 lg:fixed lg:inset-y-0 lg:flex lg:flex-col lg:border-r lg:bg-card',
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent collapsed={false} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
