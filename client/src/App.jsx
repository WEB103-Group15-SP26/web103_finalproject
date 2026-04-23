import { Routes, Route, Link } from 'react-router-dom'
import Songs from './pages/Songs'
import Artists from './pages/Artists'
import Genres from './pages/Genres'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Songs</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/genres">Genres</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Songs />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
