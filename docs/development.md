
This document includes all development steps i took when working on this project 

## 13-05-2025
- created expose and added it to README

## 05-06-2025
- setup react project using Vite
- edited intial setup, cleaned starter files
- added and edited .gitignore
### React
- chose React because it is a popular framework
- to understand how it works and learn modern frontend practices
- to make the workflow easier due to reusable components and react router
### Vite
- chose Vite build tool because it has a simpler setup (than CRA), optimized for React, modern and fast, works good with Firebase

## 06-06-2025 Feature - Random movie generation
- feature to allow userd to get a random movie quickly, should be on the main page
- created branch feature/random-movie-generation to firstly get any random movie from the movie database (tmdd)
- created tmdb.js file to connect to tmdb
- stored api key in .env
- created async function to fetch a random page from category "popular" and then a random movie
- implemented a button that calls this function
- used useState to store and disply the fetched movie
- displayed movie title, poster and decription


## 10-06-2025 - Figma - references for UX and UI, wireframes
- created a figma file, added link to REAdME
- analysed features of similar apps that suggest books or movies to users
- helped me understand alreday exsiting solutions
- looked at modern UI design for app related to movies
- created wireframes for main page with mood-sliders, movie result page, movie page and profile

## 11-06-2025 - React router
- worked on the movie card in a separate branch
- setup react router for pages: home, random movies, movie page with description, movie results based on mood anf profile
- created dev branch to combine features together 

## 13-06-2025 - Feature - Mood based search
- added new branch mood-based search
- chose 4 moods for intial implementation, decided to add other moods later
- sad-happy, calm-excited, darl-light, simple-complex
- integrated sliders into Home.jsx 
- implemented simple sliders with Usestate, so sliders manage their value
- slider values and labels are passed as props to collect mood input 
- installed bootstrap dependency in case i need it later

## 21-06-2025 - Feature - Mood based search - Core logic

### Conceptual issue:
- should the sliders and search mirror the mood of the user and suggest movies similar to the current mood, so movies with the same mood, ex. i'm sad, i want to watch a sad movie
- or should it suggest movies that heal/change the mood of user, ex. i'm sad i want to watch a cheerful movie
### Solution
- decided to implement search to match the mood first
- if there is time later implement a toggle to "change mood" option for search
- 
- changed mood names to better match user's mood, new moods:
    - sad-happy
    - anxious-calm
    - lonely-connected, to watch a family movie
    - tired-energetic
- collected mood values from sliders, used 'navigate' to send values
- created an object to store genre to mood mappings
- mapped all genres from Tmdb to the mood names, gave each genre a mood score for each mood, based on my opinion
- created MoodSearchResults,jsx to:
    - to fetch a list of popular movies with getPopularMovies function
    - to compare genre of each movie to user mood using calculateMoodScore function
    - to sort based and display movies based on match score 
    - to add labels based on the match score
- added matchLabel prop to the movie card

- calculateMoodScore logic
    - get all genres of a movie
    - use genre-to-mood map to get moods for each genre
    - average each mood across all genres
    - compare movie moods to user moods, calculate difference and match score from 0 to 100


## 05-07-2025 - Switching to GitLab
- mirrored GitHub repo to GitLab

## 06-07-2025 - Movie details page
- merged a copy of feature/mood-based-search to dev
- created a new branch feature/movie-page
- added Link to the image in the movie card, so that when user click the poster he is sent to a movie page
- implemented movie page
- movie page displays:
    - poster, movie title
    - movie genres
    - movie score, intially wanted to use reliable Imdb score, but used 'vote_average' score bu tmdb for now
    - description
    - buttons
        - add to watch later
        - add to watched 
- added a function to tmdb to fetch a movie by id

### Issue:
- movie details were displayed correctle, but genres were missing
- used passed movie details, from the search page, however they dont contain move genres
- also used function to fetch by id in case passsed movie is null or undefined
### Solution:
- decided to not take movie details from the passed object and fetch them again by id from tmdb


## 08-07-2025 - User profile, lists
For user authentication and deployment of the app I decided to use Firebase
- installed Firebase
- set up Firebase profile with google
- created Firebase authentication and database thorugh graphic interface
- created service files to connect to firebase, add movies to two lists, get movies from the lists

