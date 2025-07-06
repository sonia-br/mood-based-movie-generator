import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from './firebase';

export async function addMovieToWatchLater(userId, movie)
{
    const moviePath = doc(db, "users", userId, "watchLater", String(movie.id));

    await setDoc (moviePath,
        {
            title: movie.title,
            poster: movie.poster_path,
            genres: movie.genre_ids || [],
            score: movie.vote_average,
            addedAt: new Date()
        }
    );
}

export async function addMovieToWatched(userId, movie)
{
    const moviePath = doc(db, "users", userId, "watched", String(movie.id));

    await setDoc (moviePath,
        {
            title: movie.title,
            poster: movie.poster_path,
            genres: movie.genre_ids || [],
            score: movie.vote_average,
            addedAt: new Date()
        }
    );
}

export async function getUserMovieList(userId, listName)
{
    const listPath = collection(db, "users", userId, listName);

    const data = await getDocs(listPath);

    const movieDocs = data.docs.map( doc => ({
        id: doc.id,
        ...doc.data()
    })
    )
    return movieDocs;
}

export async function deleteMovieFromList(userId, listName, movieId)
{
    const moviePath = doc(db, "users", userId, listName, String(movieId));

    await deleteDoc(moviePath);
}