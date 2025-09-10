import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { AuthLayout } from '@/layouts/auth-layout'
import { AppLayout } from '@/layouts/app-layout'
import { LoginPage } from '@/pages/login-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { BuildingsPage } from '@/pages/buildings-page'
import { TicketsPage } from '@/pages/tickets-page'
import { InspectionsPage } from '@/pages/inspections-page'
import { WorkOrdersPage } from '@/pages/workorders-page'
import { VendorsPage } from '@/pages/vendors-page'
import { InvoicesPage } from '@/pages/invoices-page'
import { MaintenancePage } from '@/pages/maintenance-page'
import { MeetingsPage } from '@/pages/meetings-page'
import { DocumentsPage } from '@/pages/documents-page'
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
            <Navigate to={ROUTES.DASHBOARD} replace />
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
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.BUILDINGS} element={<BuildingsPage />} />
                <Route path={ROUTES.TICKETS} element={<TicketsPage />} />
                <Route path={ROUTES.INSPECTIONS} element={<InspectionsPage />} />
                <Route path={ROUTES.WORKORDERS} element={<WorkOrdersPage />} />
                <Route path={ROUTES.VENDORS} element={<VendorsPage />} />
                <Route path={ROUTES.INVOICES} element={<InvoicesPage />} />
                <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} />
                <Route path={ROUTES.MEETINGS} element={<MeetingsPage />} />
                <Route path={ROUTES.DOCUMENTS} element={<DocumentsPage />} />
                <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
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
