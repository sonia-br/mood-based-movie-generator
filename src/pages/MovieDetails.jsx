import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getMovieDetailsById } from '../services/tmdb';
import { addMovieToWatchLater, addMovieToWatched } from '../services/firestoreService';

function MovieDetails() {
    const { id } = useParams();

    // const location = useLocation();
    
    // let initialMovie = null;
    // if (location.state && location.state.movie)
    // {
    //     initialMovie = location.state.movie; // firstly checks if movie is passed and use it
    // }
    // const [movie, setMovie] = useState(initialMovie); // stores passed movie

    const [movie, setMovie] = useState(null);

    // fetch movie details from tmdb by id, if location.state is null or undefined
    useEffect(() =>
    {
        async function fetchMovie()
        {
            if (!movie)
                {
                    const movieDetails = await getMovieDetailsById(id);
                    console.log("Movie object:", movieDetails);
                    setMovie(movieDetails);
                }
        }
        fetchMovie();
    }, [id, movie])

    if (!movie)
    {
        return <div>Movie is loading</div>
    }

    let movieGenres;

    if (movie.genres && movie.genres.length > 0)
    {
        movieGenres = movie.genres.map(function(genre)
        {
            return( 
                <span key={genre.id}> {genre.name} 
                </span>
            );
                
        });
    }
    else
    {
        movieGenres = <p>Genres are not available</p>
    }
    
    


    function handleAddtoWatchList()
    {
        // add authentication when not logged in
        // need to pass userId
        
        addMovieToWatchLater();
        //console.log("Added to watch later");
    }

    function handleAddtoWatchedList()
    {
        // add authentication when not logged in
        // need to pass userId

        addMovieToWatched();
        //console.log("Added to watched");
    }

    return (
        <div>
            <div>
                <div>
                    {/* score orecentage badge */}
                </div>
                <img
                    src={'https://image.tmdb.org/t/p/w300' + movie.poster_path}
                    alt={movie.title}
                />
            </div>
            <h1>{movie.title}</h1>
            <div>
                <div>
                    {movieGenres}
                </div>
                <div>
                    <strong>Score:</strong> {movie.vote_average}
                </div>
                <p>{movie.overview}</p>
            </div>
            
            <div className="content__buttons">
    
                <button  onClick={handleAddtoWatchList}>
                    Add to watch later
                    </button>
                
                <button  onClick={handleAddtoWatchedList}>
                    Already watched
                </button>
            </div>
        </div>

    );
}
export default MovieDetails;