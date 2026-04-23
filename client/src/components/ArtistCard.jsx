import { useState } from 'react'

function ArtistCard({ artist, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(artist.name)

  const handleSave = () => {
    onEdit(artist.id, name)
    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          <input value={name} onChange={e => setName(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{artist.name}</h3>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  )
}

export default ArtistCard
