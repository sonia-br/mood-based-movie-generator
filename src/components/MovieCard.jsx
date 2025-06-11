import React from 'react';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={'https://image.tmdb.org/t/p/w300' + movie.poster_path}
        alt={movie.title}
      />
      <h2 className="movie-title">{movie.title}</h2>
      <h3 className="movie-title">{movie.raiting}</h3>
      <p className="movie-overview">{movie.overview}</p>
    </div>
  );
}