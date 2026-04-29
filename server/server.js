import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import './config/dotenv.js'
import songsRouter from './routes/songs.js'
import artistsRouter from './routes/artists.js'
import genresRouter from './routes/genres.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/songs', songsRouter)
app.use('/api/artists', artistsRouter)
app.use('/api/genres', genresRouter)

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
