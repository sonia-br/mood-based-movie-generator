import { Link } from 'react-router-dom';

function Home()
{
    return(
        <div>
            <h1>What's your mood today?</h1>
            <h3>Select at least 4 sliders</h3>
            <p>Mood sliders will go here</p>
            <div>
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