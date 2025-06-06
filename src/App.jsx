import { useState } from 'react'
import { getRandomMovieFromPopular } from './services/tmdb';
import './App.css'

function App() {
  const [movie, setMovie] = useState(null);

  async function handleClick() {
    const movie = await getRandomMovieFromPopular();
    setMovie(movie);
  }
  let movieBlock;

  if (movie) {
    movieBlock = (
      <div style={{ marginTop: '20px' }}>
        <h2>{movie.title}</h2>
        <img
          src={'https://image.tmdb.org/t/p/w300' + movie.poster_path}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Mood-Based Movie Generator</h1>

      <button onClick={handleClick}>Generate random movie</button>

      {/* Show movieBlock only if movie is not null */}
      {movieBlock}
    </div>
  );
}

export default App
