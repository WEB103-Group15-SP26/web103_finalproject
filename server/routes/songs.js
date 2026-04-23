import express from 'express'
import { getSongs, getSong, createSong, deleteSong } from '../controllers/songs.js'

const router = express.Router()

router.get('/', getSongs)
router.get('/:id', getSong)
router.post('/', createSong)
router.delete('/:id', deleteSong)

export default router
