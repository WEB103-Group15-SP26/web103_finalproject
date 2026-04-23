import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import songsRouter from './routes/songs.js'
import artistsRouter from './routes/artists.js'
import genresRouter from './routes/genres.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/songs', songsRouter)
app.use('/api/artists', artistsRouter)
app.use('/api/genres', genresRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
