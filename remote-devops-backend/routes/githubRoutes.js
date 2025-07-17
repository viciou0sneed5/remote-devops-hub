import express from 'express'
import { loginWithGitHub, getUserRepos, deployToRender } from '../controllers/githubController.js'

const router = express.Router()

router.post('/login', loginWithGitHub)
router.get('/repos', getUserRepos)
router.post('/deploy-render', deployToRender)
import { getDeployments } from '../controllers/githubController.js'

router.get('/deployments', getDeployments)
export default router
