import mongoose from 'mongoose'

const deploymentSchema = new mongoose.Schema({
  name: String,
  repoUrl: String,
  githubUser: String,
  deployedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Deployment', deploymentSchema)
