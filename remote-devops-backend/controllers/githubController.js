import axios from 'axios'
import Deployment from '../models/Deployment.js'

export const loginWithGitHub = async (req, res) => {
  try {
    const { code } = req.body

    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    )

    const accessToken = tokenResponse.data.access_token

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    res.json({ token: accessToken, user: userResponse.data })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Login failed' })
  }
}

export const getUserRepos = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const repos = await axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    res.json(repos.data)
  } catch (err) {
    console.error('Fetch repo error:', err.message)
    res.status(500).json({ error: 'Failed to fetch repos' })
  }
}

export const deployToRender = async (req, res) => {
  const { repoUrl, repoName, githubUser } = req.body

  try {
    const RENDER_API_KEY = process.env.RENDER_API_KEY
    console.log('Deploying to Render...')
    console.log('Repo:', repoUrl)
    console.log('User:', githubUser)
    console.log('Render API Key:', RENDER_API_KEY ? 'Present' : 'Missing')

    if (!RENDER_API_KEY) {
      return res.status(500).json({ error: 'Missing Render API Key' })
    }

    // Simulate request to Render API
    // Real Render API requires specific service setup and repo linkage
    await Deployment.create({ name: repoName, repoUrl, githubUser })

    res.status(200).json({ message: 'Render deployment started!' })
  } catch (err) {
    console.error('Render deploy error:', err.message)
    res.status(500).json({ error: 'Failed to deploy to Render' })
  }
}
export const getDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.find().sort({ deployedAt: -1 })
    res.json(deployments)
  } catch (err) {
    console.error('Error fetching deployments:', err)
    res.status(500).json({ error: 'Failed to fetch deployments' })
  }
}
