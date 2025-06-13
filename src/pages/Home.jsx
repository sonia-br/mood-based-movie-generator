import { Link } from 'react-router-dom';
import MoodSlider from '../components/MoodSlider';


function Home()
{
    return(
        <div>
            <h1>What's your mood today?</h1>
            <h3>Select at least 4 sliders</h3>
            <section className="mood-sliders">
                <MoodSlider
                labelLeft="Sad"
                labelRight="Happy"
                moodName="happiness"
                onChange={(name, value) => console.log(name,value)}
                />
            <MoodSlider
                labelLeft="Calm"
                labelRight="Excited"
                moodName="excitement"
                onChange={(name, value) => console.log(name,value)}
                />
            <MoodSlider
                labelLeft="Dark"
                labelRight="Light"
                moodName="lightness"
                onChange={(name, value) => console.log(name,value)}
                />
            <MoodSlider
                labelLeft="Simple"
                labelRight="Complex"
                moodName="simplicity"
                onChange={(name, value) => console.log(name,value)}
                /></section>
            
            <div className="content__buttons">
                    <Link to="/mood-results">
                        <button>Search by mood</button>
                    </Link> 
                <Link to="/random">
                    <button>Random movie</button>
                </Link> 
            </div>
        </div>
    );
}
export default Home;