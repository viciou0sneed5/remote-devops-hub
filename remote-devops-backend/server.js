import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import githubRoutes from './routes/githubRoutes.js'

dotenv.config()

const app = express()

console.log('MONGO:', process.env.MONGODB_URI)

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/github', githubRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
