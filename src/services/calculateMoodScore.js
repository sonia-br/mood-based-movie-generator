import { genreMoodMap } from "./genreMoodMap";

export function calculateMoodScore(movieGenreIds, userMoods)
{
    if (!movieGenreIds || movieGenreIds.length === 0)
        {
            return 0;
        }
    
    const mappedMoods = [];

    // takes moods for each genre from map and saves them in array for each fetched movie
    for ( let i = 0; i < movieGenreIds.length; i++)
    {
        const genreId = movieGenreIds[i];
        const moods = genreMoodMap[genreId];

        if (moods != undefined && moods != null)
        {
            mappedMoods.push(moods); // push adds to the end of array mappedmoods
        }
    }

    if ( mappedMoods.length === 0)
    {
        return 0;
    }

    const moodNames = Object.keys(userMoods); // array of names from user mood names and values
    const averageMoodOfMovie = {};
    for ( let i = 0; i < moodNames.length; i++)
    {
        const mood = moodNames[i];
        let sumOfMoods = 0;

        // for each mood of user, calculate sum of this mood values of movie
        for (let j = 0; j < mappedMoods.length; j++)
        {
            const mappedMoodFromMovie = mappedMoods[j];

            let moodValue = mappedMoodFromMovie[mood];
            if (moodValue === undefined)
            {
                moodValue = 0;
            }
            sumOfMoods += moodValue;
        }

        const meanOfMood = sumOfMoods / mappedMoods.length;
        averageMoodOfMovie[mood] = meanOfMood;
    } 

    // find difference between mood of user and movie mapped mood
    let totalMoodDifference = 0;
    for (let i = 0; i < moodNames.length; i++)
    {
        const mood = moodNames[i];
        const userMoodValue = userMoods[mood];
        const movieMoodValue = averageMoodOfMovie[mood];

        const moodDifference = Math.abs(userMoodValue - movieMoodValue);

        totalMoodDifference += moodDifference;
    }

    
    const maxDifference = moodNames.length * 10; // max difference in moods there can be (each slider is max 10)
    const score = 100 - Math.round((totalMoodDifference / maxDifference) * 100);

    return score;
}