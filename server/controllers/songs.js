import { pool } from '../config/database.js'

export const getSongs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT songs.*, artists.name AS artist_name
      FROM songs
      JOIN artists ON songs.artist_id = artists.id
      ORDER BY songs.created_at DESC
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getSong = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT songs.*, artists.name AS artist_name
      FROM songs
      JOIN artists ON songs.artist_id = artists.id
      WHERE songs.id = $1
    `, [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Song not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createSong = async (req, res) => {
  try {
    const { title, artist_id, year } = req.body
    if (!title || !artist_id) return res.status(400).json({ error: 'Title and artist_id are required' })
    const result = await pool.query(
      'INSERT INTO songs (title, artist_id, year) VALUES ($1, $2, $3) RETURNING *',
      [title, artist_id, year || null]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM songs WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) return res.status(404).json({ error: 'Song not found' })
    res.json({ message: 'Song deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
