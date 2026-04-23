import { pool } from '../config/database.js'

export const getGenres = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM genres ORDER BY name ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createGenre = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Name is required' })
    const result = await pool.query(
      'INSERT INTO genres (name) VALUES ($1) RETURNING *',
      [name]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Genre already exists' })
    res.status(500).json({ error: err.message })
  }
}

export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM genres WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Genre not found' })
    res.json({ message: 'Genre deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
