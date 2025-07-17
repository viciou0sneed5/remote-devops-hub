import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const GitHubCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGitHubToken = async () => {
      const queryParams = new URLSearchParams(window.location.search)
      const code = queryParams.get('code')

      if (!code) {
        alert('GitHub authorization code missing')
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/api/github/login', { code })
        
        const { token, user } = response.data

        localStorage.setItem('githubToken', token)
        localStorage.setItem('githubUser', JSON.stringify(user))

        navigate('/dashboard')
      } catch (err) {
        console.error('Login failed:\n', err)
        alert('GitHub login failed')
      }
    }

    fetchGitHubToken()
  }, [navigate])

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl">Logging you in via GitHub...</h1>
    </div>
  )
}

export default GitHubCallback
