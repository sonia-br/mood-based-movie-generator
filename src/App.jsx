import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';

import Home from './pages/Home';
import RandomMovie from './pages/RandomMovie';
import MovieDetails from './pages/MovieDetails';
import MoodSearchResults from './pages/MoodSearchResults';
import Profile from './pages/Profile';
import Authentication from './pages/Authentication';

function App() {

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []); // when app opens, checks if user is logged in

  function handleLogout()
  {
    signOut(auth).then(() => {
      navigate('/auth');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }

  if (!authChecked) return null;


  return (

    <>
      {user && (
        <div className="content__buttons">
          <button onClick={handleLogout} >
            Logout
          </button>
        </div>
      )}

      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/random" element={<RandomMovie />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/mood-results" element={<MoodSearchResults />} />
      <Route path="/auth" element={!user ? <Authentication /> : <Navigate to="/profile" />} />
      <Route path="/profile" element={ user ? <Profile user={user} /> : <Navigate to="/auth" />} />
    </Routes>
    </>
  );
}

export default App;
