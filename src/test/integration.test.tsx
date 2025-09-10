import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Mock para evitar errores de navegación en tests
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('App Integration Tests', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
  })

  it('should redirect to login when not authenticated', () => {
    renderWithProviders(<App />)
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(screen.getByText('Consorcios')).toBeInTheDocument()
  })

  it('should show validation errors for invalid login data', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Probar email inválido
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'invalid-email')
    await user.type(passwordInput, '123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
      expect(
        screen.getByText('La contraseña debe tener al menos 6 caracteres')
      ).toBeInTheDocument()
    })
  })

  it('should login successfully with valid credentials', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    // Esperar a que aparezca el dashboard
    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: 'Dashboard' })
        ).toBeInTheDocument()
        expect(
          screen.getByText('Vista general del sistema de consorcios')
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('should navigate through all routes after login', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Login primero
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Contraseña'), 'password123')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: 'Dashboard' })
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Probar navegación a Edificios
    await user.click(screen.getByText('Edificios'))
    await waitFor(() => {
      expect(
        screen.getByText('Gestión de edificios y unidades')
      ).toBeInTheDocument()
    })

    // Probar navegación a Tickets
    await user.click(screen.getByText('Tickets'))
    await waitFor(() => {
      expect(
        screen.getByText('Gestión de reclamos y solicitudes')
      ).toBeInTheDocument()
    })

    // Probar navegación a Inspecciones
    await user.click(screen.getByText('Inspecciones'))
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Inspecciones' })
      ).toBeInTheDocument()
    })
  })

  it('should logout successfully', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    // Login primero
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Contraseña')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', { name: 'Dashboard' })
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    // Hacer logout
    const logoutButton = screen.getByTitle('Cerrar sesión')
    await user.click(logoutButton)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Iniciar Sesión' })
      ).toBeInTheDocument()
    })
  })
})
