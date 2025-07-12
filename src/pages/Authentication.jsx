import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        if (isRegistering) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
        navigate('/profile');
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="auth-page" style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
  
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <button type="submit" style={{ width: '100%' }}>
            {isRegistering ? 'Create Account' : 'Login'}
          </button>
          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </form>
  
        <p style={{ marginTop: 10 }}>
          {isRegistering
            ? 'Already have an account? '
            : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    );
  }