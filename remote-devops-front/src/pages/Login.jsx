// 📁 remote-devops-front/src/pages/Login.jsx

import React from 'react'
import axios from 'axios'

const Login = () => {
  const handleLogin = async () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const redirectUri = 'http://localhost:5173/github/callback'
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo user`
    window.location.href = githubAuthUrl
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-xl mb-4">Welcome to RemoteDevOps Hub</h1>
        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  )
}

export default Login
