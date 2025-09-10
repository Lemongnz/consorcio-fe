import { useAuthStore } from '../auth-store'

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.getState().logout()
  })

  it('should initialize with default state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('should login user correctly', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin',
    }
    const mockToken = 'mock-token'

    useAuthStore.getState().login(mockUser, mockToken)

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe(mockToken)
    expect(state.isAuthenticated).toBe(true)
  })

  it('should logout user correctly', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin',
    }
    const mockToken = 'mock-token'

    // First login
    useAuthStore.getState().login(mockUser, mockToken)
    
    // Then logout
    useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('should update user correctly', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'admin',
    }
    const mockToken = 'mock-token'

    useAuthStore.getState().login(mockUser, mockToken)
    useAuthStore.getState().updateUser({ name: 'Updated Name' })

    const state = useAuthStore.getState()
    expect(state.user?.name).toBe('Updated Name')
    expect(state.user?.email).toBe('test@example.com') // Should keep other properties
  })
})
