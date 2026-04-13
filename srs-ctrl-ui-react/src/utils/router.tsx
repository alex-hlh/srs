import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store'

interface AuthRouteProps {
  children: React.ReactNode
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const location = useLocation()
  const token = useUserStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export const getToken = (): string | null => {
  return useUserStore.getState().token
}
