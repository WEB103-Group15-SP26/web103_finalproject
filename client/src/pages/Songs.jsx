import { useState, useEffect } from 'react'
import SongCard from '../components/SongCard'

function Songs() {
  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [form, setForm] = useState({ title: '', artist_id: '', year: '' })
  const [error, setError] = useState(null)

  const fetchSongs = async () => {
    const res = await fetch('/api/songs')
    const data = await res.json()
    setSongs(data)
  }

  useEffect(() => {
    fetchSongs()
    fetch('/api/artists').then(r => r.json()).then(setArtists)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setForm({ title: '', artist_id: '', year: '' })
    fetchSongs()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/songs/${id}`, { method: 'DELETE' })
    fetchSongs()
  }

  return (
    <div>
      <h1>Songs</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Song title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <select
          value={form.artist_id}
          onChange={e => setForm({ ...form, artist_id: e.target.value })}
        >
          <option value="">Select artist</option>
          {artists.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        <input
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={e => setForm({ ...form, year: e.target.value })}
        />
        <button type="submit">Add Song</button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>

      <div>
        {songs.map(song => (
          <SongCard key={song.id} song={song} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default Songs
