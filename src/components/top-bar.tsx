import { Menu, LogOut } from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'

export function TopBar() {
  const { toggleSidebar } = useUIStore()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden lg:flex"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          Bienvenido, {user?.name}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
