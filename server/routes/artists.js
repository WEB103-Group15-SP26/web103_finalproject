import express from 'express'
import { getArtists, getArtist, createArtist, updateArtist, deleteArtist } from '../controllers/artists.js'

const router = express.Router()

router.get('/', getArtists)
router.get('/:id', getArtist)
router.post('/', createArtist)
router.patch('/:id', updateArtist)
router.delete('/:id', deleteArtist)

export default router
