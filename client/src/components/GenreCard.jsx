function GenreCard({ genre, onDelete }) {
  return (
    <div>
      <h3>{genre.name}</h3>
      <button onClick={() => onDelete(genre.id)}>Delete</button>
    </div>
  )
}

export default GenreCard
