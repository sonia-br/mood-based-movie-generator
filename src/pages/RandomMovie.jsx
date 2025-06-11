import { useState } from 'react'
import { getRandomMovieFromPopular } from './services/tmdb';
import './App.css'

function App() {
  const [movie, setMovie] = useState(null);

  async function handleClick() {
    const movie = await getRandomMovieFromPopular();
    setMovie(movie);
  }
  return (
    <div>
      {!movie && <h1>Mood-Based Movie Generator</h1>}

      {movie && <MovieCard movie={movie} />}
      <button onClick={handleClick}>Generate random movie</button>
    </div>
  );
}

export default RandomMovie