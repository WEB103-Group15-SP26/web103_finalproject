import { useState, useEffect } from 'react'
import GenreCard from '../components/GenreCard'

function Genres() {
  const [genres, setGenres] = useState([])
  const [form, setForm] = useState({ name: '' })
  const [error, setError] = useState(null)

  const fetchGenres = async () => {
    const res = await fetch('/api/genres')
    const data = await res.json()
    setGenres(data)
  }

  useEffect(() => { fetchGenres() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/genres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setForm({ name: '' })
    fetchGenres()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/genres/${id}`, { method: 'DELETE' })
    fetchGenres()
  }

  return (
    <div>
      <h1>Genres</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Genre name"
          value={form.name}
          onChange={e => setForm({ name: e.target.value })}
        />
        <button type="submit">Add Genre</button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>

      <div>
        {genres.map(genre => (
          <GenreCard key={genre.id} genre={genre} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default Genres
