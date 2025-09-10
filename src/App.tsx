import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { AuthLayout } from '@/layouts/auth-layout'
import { AppLayout } from '@/layouts/app-layout'
import { LoginPage } from '@/pages/login-page'
import { HomePage } from '@/features/auth/pages/home-page'
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'
import { BuildingsPage } from '@/features/buildings/pages/buildings-page'
import { UnitsPage } from '@/features/units/pages/units-page'
import { TicketsPage } from '@/features/tickets/pages/tickets-page'
import { InspectionsPage } from '@/features/inspections/pages/inspections-page'
import { WorkOrdersPage } from '@/features/workorders/pages/workorders-page'
import { VendorsPage } from '@/features/vendors/pages/vendors-page'
import { InvoicesPage } from '@/features/invoices/pages/invoices-page'
import { MaintenancePage } from '@/features/maintenance/pages/maintenance-page'
import { MeetingsPage } from '@/features/meetings/pages/meetings-page'
import { DocumentsPage } from '@/features/documents/pages/documents-page'
import { ROUTES } from '@/lib/constants'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      {/* Auth routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.HOME} replace />
          ) : (
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path={ROUTES.BUILDINGS} element={<BuildingsPage />} />
                <Route path={ROUTES.UNITS} element={<UnitsPage />} />
                <Route path={ROUTES.TICKETS} element={<TicketsPage />} />
                <Route
                  path={ROUTES.INSPECTIONS}
                  element={<InspectionsPage />}
                />
                <Route path={ROUTES.WORKORDERS} element={<WorkOrdersPage />} />
                <Route path={ROUTES.VENDORS} element={<VendorsPage />} />
                <Route path={ROUTES.INVOICES} element={<InvoicesPage />} />
                <Route
                  path={ROUTES.MAINTENANCE}
                  element={<MaintenancePage />}
                />
                <Route path={ROUTES.MEETINGS} element={<MeetingsPage />} />
                <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />
                <Route
                  path="*"
                  element={
                    <div className="py-12 text-center">
                      <h2 className="text-2xl font-bold">
                        Página en construcción
                      </h2>
                      <p className="text-muted-foreground">
                        Esta funcionalidad estará disponible próximamente
                      </p>
                    </div>
                  }
                />
              </Routes>
            </AppLayout>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />
    </Routes>
  )
}

export default App
