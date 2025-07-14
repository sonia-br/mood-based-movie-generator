import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MoodSlider from '../components/MoodSlider';
import './Home.css';


function Home()
{
    const [moods, setMoods] = useState({});
    const navigate = useNavigate();
    
    function updateMood(previousValues, name, value)
    {
        //takes last saved properties of object mood and updates one
        const newValues = {...previousValues};
            newValues[name] = value;
            return newValues;
    }

    function trackMoodChange(name, value)
    {
        //updates mood object
        setMoods( previousValues => updateMood(previousValues, name, value)); 
    }

    function isEnoughMoods()
    {
        const bool = Object.keys(moods).length >= 3;
        return bool;
    }

    function handleSearchClick()
    {
        // to go to results page and send chosen moods
        navigate('/mood-results', {state: moods});
    }

    return(
        <div>
            <h1>How are you feeling today?</h1>
            <h3>Select at least 3 sliders</h3>
            <section className="mood-sliders">
                <MoodSlider
                labelLeft="Sad"
                labelRight="Happy"
                moodName="happiness"
                onChange={trackMoodChange}
                />
            <MoodSlider
                labelLeft="Anxious"
                labelRight="Calm"
                moodName="calmness"
                onChange={trackMoodChange}
                />
            <MoodSlider
                labelLeft="Lonely"
                labelRight="Connected"
                moodName="connectedness"
                onChange={trackMoodChange}
                />
            <MoodSlider
                labelLeft="Tired"
                labelRight="Energetic"
                moodName="energy"
                onChange={trackMoodChange}
                /></section>
            
            <div className="content__buttons">
    
                <button  onClick={handleSearchClick} disabled={!isEnoughMoods()}>
                    Search by mood
                    </button>
                    
                <Link to="/random">
                    <button>Random movie</button>
                </Link> 
            </div>
        </div>
    );
}
export default Home;