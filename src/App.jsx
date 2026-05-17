import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import StudentDashboard from './pages/StudentDashboard'
import DayPackPage from './pages/DayPackPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminStudentView from './pages/AdminStudentView'
import AdminMarkWork from './pages/AdminMarkWork'
import LoadingScreen from './components/LoadingScreen'

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (requireAdmin && profile?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

function StudentRoute({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />
  return children
}

function RootRedirect() {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />
  return <Navigate to="/dashboard" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Student routes */}
          <Route path="/dashboard" element={
            <StudentRoute><StudentDashboard /></StudentRoute>
          } />
          <Route path="/pack/:dayNum" element={
            <StudentRoute><DayPackPage /></StudentRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/student/:studentId" element={
            <ProtectedRoute requireAdmin><AdminStudentView /></ProtectedRoute>
          } />
          <Route path="/admin/mark/:studentId/:dayNum" element={
            <ProtectedRoute requireAdmin><AdminMarkWork /></ProtectedRoute>
          } />

          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
