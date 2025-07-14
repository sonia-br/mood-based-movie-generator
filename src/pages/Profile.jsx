import { useState, useEffect } from 'react';
import { getUserMovieList } from '../services/firestoreService';
import { Link } from 'react-router-dom';

function Profile({ user }) {
    const [activeTab, setActiveTab] = useState('watchLater');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovies() {
            if (!user) return;

            setLoading(true);
            const list = await getUserMovieList(user.uid, activeTab);
            setMovies(list);
            setLoading(false);
        }

        fetchMovies();
    }, [user, activeTab]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <h1>Your Profile</h1>

            <div className="content__buttons">
                <button onClick={() => handleTabClick('watchLater')}>
                    To Watch
                </button>
                <button onClick={() => handleTabClick('watched')}>
                    Watched
                </button>
            </div>

            <div>
                {loading ? (
                    <p>Loading movies...</p>
                ) : movies.length === 0 ? (
                    <p>No movies in this list.</p>
                ) : (
                    <div>
                        {movies.map((movie) => (
                            <Link to={`/movie/${movie.id}`}>
                            <div key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                                    alt={movie.title}
                                />
                                <p>{movie.title}</p>
                            </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;