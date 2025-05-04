import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already exists. Try logging in instead.');
      } else {
        alert('Sign up failed: ' + error.message);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSignUp}>
      <div className="mb-3" id="block">
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3" id="block">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="loginBtn">Continue</button>
    </form>
  );
};

export default AuthForm;




