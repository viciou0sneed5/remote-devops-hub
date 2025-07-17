import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white p-4 shadow flex justify-between">
      <div className="font-bold text-lg">RemoteDevOps Hub</div>
      <div>
        <Link to="/" className="mx-2">Dashboard</Link>
        <Link to="/login" className="mx-2">Login</Link>
      </div>
    </nav>
  )
}
