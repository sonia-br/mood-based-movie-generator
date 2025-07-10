import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RandomMovie from './pages/RandomMovie';
import MovieDetails from './pages/MovieDetails';
import MoodSearchResults from './pages/MoodSearchResults';
import Profile from './pages/Profile';

function App() {
  return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random" element={<RandomMovie />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/mood-results" element={<MoodSearchResults />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
