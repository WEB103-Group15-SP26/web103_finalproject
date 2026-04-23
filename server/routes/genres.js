import express from 'express'
import { getGenres, createGenre, deleteGenre } from '../controllers/genres.js'

const router = express.Router()

router.get('/', getGenres)
router.post('/', createGenre)
router.delete('/:id', deleteGenre)

export default router
