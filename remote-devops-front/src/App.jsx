import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import GitHubCallback from './pages/GitHubCallback'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/github/callback" element={<GitHubCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default App
