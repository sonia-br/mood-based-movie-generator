import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getMovieDetailsById } from '../services/tmdb';
import { addMovieToWatchLater, addMovieToWatched, deleteMovieFromList } from '../services/firestoreService';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // const location = useLocation();
    
    // let initialMovie = null;
    // if (location.state && location.state.movie)
    // {
    //     initialMovie = location.state.movie; // firstly checks if movie is passed and use it
    // }
    // const [movie, setMovie] = useState(initialMovie); // stores passed movie

    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState();
    const [inWatchLater, setInWatchLater] = useState(false);
    const [inWatched, setInWatched] = useState(false);

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
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []); // to subscribe to authentication

    // to check if movie is any fo the lists
    useEffect(() => {
        if (user && movie?.id) {
            const checkMovieInLists = async () => {
                const watchLaterPath = doc(db, "users", user.uid, "watchLater", String(movie.id));
                const watchedPath = doc(db, "users", user.uid, "watched", String(movie.id));

                const [watchLaterSnap, watchedSnap] = await Promise.all([
                    getDoc(watchLaterPath),
                    getDoc(watchedPath)
                ]);

                setInWatchLater(watchLaterSnap.exists());
                setInWatched(watchedSnap.exists());
            };

            checkMovieInLists();
        }
    }, [user, movie]);


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
    
    const handleAddtoWatchList = async () =>{
        if (!user)
        {
            navigate('/auth');
            return;
        }

        try
        {
            if (inWatchLater)
            {
                await deleteMovieFromList(user.uid, "watchLater", movie.id);
                setInWatchLater(false);
            }
            else
            {
                await addMovieToWatchLater(user.uid, movie);
                setInWatchLater(true);
            }
        }
        catch (error)
        {
            console.error('Unable to add movie to Watch Later list', error);
        }
    };


    const handleAddtoWatchedList = async () => {
        if (!user)
        {
            navigate('/auth');
            return;
        }

        try
        {
            if (inWatched)
            {
                await deleteMovieFromList(user.uid, "watched", movie.id);
                setInWatched(false);
            }
            else
            {
                await addMovieToWatched(user.uid, movie);
                setInWatched(true);
            }
        }
        catch (error)
        {
            console.error('Unable to add movie to Watched list', error)
        }
    };

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
                    {inWatchLater ? 'Remove from Watch Later' : 'Add to watch later'}
                    </button>
                
                <button  onClick={handleAddtoWatchedList}>
                {inWatched ? 'Remove from Watched' : 'Already watched'}
                </button>
            </div>
        </div>

    );
}
export default MovieDetails;