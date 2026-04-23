import { pool } from '../config/database.js'

export const getArtists = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getArtist = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createArtist = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Name is required' })
    const result = await pool.query(
      'INSERT INTO artists (name) VALUES ($1) RETURNING *',
      [name]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateArtist = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Name is required' })
    const result = await pool.query(
      'UPDATE artists SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Artist not found' })
    res.json({ message: 'Artist deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
