# Mood based movie recommendation tool with random movie generator and movie tracker

## Description
This web app will help users find movies based on the mood. User can track wacthed films, write reviws or add comments, add films to watch-later list and share them with friends.

## Usecase
1. Find movies by mood and atmosphere of the movie.
   - User can adjust sliders (for ex. funny to sad) to match their mood or the emotions they want to get from a film.
2. Save and track movies.
   - User can add movies to "wacthed", "to watch', "favorites". This feauture is possible if user is logged in
3. Add reviews or comments after watching
4. Log in to profile to see saved movies, reviews
5. Share lists with friends
6. In case users have no idea what to watch, the app can randomly suggest a movie

## UX
- Clean and minimalistic UI
- Mood selection with sliders to get results based on high user feels, without focusing on genre and other movie details
- Intuitive and easy user experience
- Simple user flow
    1. Adjust sliders
    2. See results
    3. Try to search again
    4. Save to watch later, watched or favorites
    5. Remove or add films to and from the lists
    6. Get a random movie suggestion with one click
- Responsive design, adapted to different devices 

## Implementation outline

- Build frontend
    - mood slider interface and display logic
    - use to TMDb, movie database
    - add watchlist functionality using localStorage
    - implement random movie feature
    - allow users to generate a sharable public watchlist
- Build backend
    -set up login/register
- UI cleanup
    - add mobile responsiveness
    - animations
- error handling, testing

### Tech Stack 

- HTML, CSS, JavaScript with React
- TMDb API, free movie database, provides info like movie titles, posters, genres, ratings, and descriptions

- Firebase to host the website
- Firebase Authentication and Firestore to manage login/registration and storing user data

### Architecture

- Serverless architecture using React for the frontend and Firebase for backend
- This web app is a dynamic Single Page Application (SPA), it communicates directly with third-party APIs without the need for a traditional backend server

### Data Flow

1. User logs in (or registers) via Firebase Authentication.
2. User selects mood using sliders, app calculates score and maps mood to genre IDs.
3. TMDb API is queried to get matching movies.
4. All saved data is stored in Firebase Firestore under the logged-in user's ID.
5. When the user accesses the app from another device, their data is retrieved and synced automatically.