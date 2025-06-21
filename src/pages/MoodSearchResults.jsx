import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { calculateMoodScore } from "../services/calculateMoodScore";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function compareMovieScores(movieA, movieB)
{
    if ( movieA.score < movieB.score)
    {
        return 1; // put B before A
    }
    else if ( movieA.score > movieB.score )
    {
        return -1;
    }
    else
    {
        return 0;
    }

}

function MoodSearchResults(){

    const location = useLocation();
    const userMoods = location.state;

    const [matchedMovies, setMatchedMovies] = useState([]);

    async function getMatchingMovies()
        {
            const movies = await getPopularMovies();

            const scoredMovies = [];

            for (let i = 0; i < movies.length; i++)
            {
                const movie = movies[i];
                const movieGenres = movie.genre_ids;
                const movieScore = calculateMoodScore(movieGenres, userMoods);

                const moviePlusScore = { ...movie, score: movieScore }; // ...movie - short way of writing all properties
                scoredMovies.push(moviePlusScore);
            }
            scoredMovies.sort(compareMovieScores); // sorts and modifies original array
            setMatchedMovies(scoredMovies);
        }

    useEffect( function ()
        {
            getMatchingMovies();
        },
        [userMoods] // dependency array, runs again if usermood changes
        );

    return (
        <div>
            <h1>Movies that match your mood</h1>
            <p>Movie cards with best/fair match badges</p>
            <div className="movie-list">
                {matchedMovies.map(function(movie) {
                    let label = "";
                    if (movie.score >= 85) {
                    label = "Best Match";
                    } else if (movie.score >= 60) {
                    label = "Fair Match";
                    }

                    return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        matchLabel={label}
                    />
                    );
                })}
            </div>
        </div>
    );
}
export default MoodSearchResults;