import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';
import TopNavigation from './components/TopNavigation';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { setAuthorizationHeaders } from './utils';

function App() {
  const [user, setUser] = useState({
    token: null,
    role: 'user',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.filmsToken) {
      const token = localStorage.filmsToken;
      setUser({
        token,
        role: jwtDecode(token).user.role,
      });
      setAuthorizationHeaders(token);
    }
  }, []);

  const logout = () => {
    setUser({
      token: null,
      role: 'user',
    });
    setAuthorizationHeaders();
    localStorage.removeItem('filmsToken');
  };

  const login = (token) => {
    setUser({
      token,
      role: jwtDecode(token).user.role,
    });
    localStorage.filmsToken = token;
    setAuthorizationHeaders(token);
  };

  return (
    <Router>
      <div className="ui container mt-3">
        <TopNavigation
          isAuth={user.token}
          logout={logout}
          isAdmin={user.token && user.role === 'admin'}
        />

        {message && (
          <div className="ui info message">
            <i className="close icon" onClick={() => setMessage('')} />
            {message}
          </div>
        )}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage user={user} />} />
          <Route path="/film/:_id" element={<Film />} />
          <Route path="/signup" element={<SignUpPage setMessage={setMessage} />} />
          <Route path="/login" element={<LoginPage login={login} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
