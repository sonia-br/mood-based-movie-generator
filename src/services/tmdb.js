const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getRandomMovieFromPopular()
{
    const randomPage = Math.floor((Math.random() * 10) + 1);

    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${randomPage}`;

    try
    {
        const response = await fetch(url); //connect to api
        const data = await response.json(); // get data as json data
        const movies = data.results; // amke a list of movies

        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];

        return randomMovie;
    }
    catch (error)
    {
        console.error('Error - fetching data from Tmdb', error);
        return null;
    }
}