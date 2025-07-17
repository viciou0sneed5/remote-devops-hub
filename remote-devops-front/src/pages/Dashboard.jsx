import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [repos, setRepos] = useState([])
  const [deployments, setDeployments] = useState([])

  // ✅ Fetch GitHub Repositories
  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem('githubToken')
      const user = JSON.parse(localStorage.getItem('githubUser'))

      if (!token || !user) {
        alert('Login again. Token or user missing.')
        return
      }

      const response = await axios.get(`https://api.github.com/users/${user.login}/repos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setRepos(response.data)
    } catch (err) {
      console.error('Repo fetch error:', err)
      alert('Failed to load repositories')
    }
  }

  // ✅ Fetch Deployed Projects from MongoDB
  const fetchDeployments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/github/deployments')
      setDeployments(response.data)
    } catch (err) {
      console.error('Deployment fetch error:', err)
    }
  }

  // ✅ Deploy Button Click Handler
  const handleDeploy = async (repo) => {
    try {
      const token = localStorage.getItem('githubToken')
      const user = JSON.parse(localStorage.getItem('githubUser'))

      const response = await axios.post('http://localhost:5000/api/github/deploy-render', {
        repoUrl: repo.clone_url,
        repoName: repo.name,
        githubUser: user.login
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert('Deployment started on Render!')
      fetchDeployments()
    } catch (err) {
      console.error('Deploy error:', err)
      alert('Failed to deploy to Render')
    }
  }

  useEffect(() => {
    fetchRepos()
    fetchDeployments()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Your GitHub Repositories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div key={repo.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{repo.name}</h2>
            <p className="text-sm">{repo.description}</p>
            <button
              onClick={() => handleDeploy(repo)}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
            >
              Deploy to Render
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">✅ Deployed Projects</h2>
      {deployments.length === 0 ? (
        <p className="text-gray-500">No deployments found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {deployments.map((d) => (
            <li key={d._id}>
              <strong>{d.name}</strong> - {d.repoUrl} - Deployed At: {new Date(d.deployedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
