function SongCard({ song, onDelete }) {
  return (
    <div>
      <h3>{song.title}</h3>
      <p>{song.artist_name} {song.year ? `· ${song.year}` : ''}</p>
      <button onClick={() => onDelete(song.id)}>Delete</button>
    </div>
  )
}

export default SongCard
