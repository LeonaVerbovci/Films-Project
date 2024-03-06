import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TopNavigation from './components/TopNavigation';
import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import SignupPage from './pages/SignUpPage';
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
      setUser({
        token: localStorage.filmsToken,
        role: jwtDecode(localStorage.filmsToken).user.role,
      });
      setAuthorizationHeaders(localStorage.filmsToken);
    }
  }, []);

  const logout = () => {
    setUser({ token: null, role: 'user' });
    setAuthorizationHeaders();
    localStorage.removeItem('filmsToken');
  };

  const login = (token) => {
    setUser({ token, role: jwtDecode(token).user.role });
    console.log('token', token);
    localStorage.filmsToken = token;
    setAuthorizationHeaders(token);
  };

  return (
    <Router>
      <div className="ui container mt-3">
        <TopNavigation
          isAuth={!!user.token}
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
          <Route path="/" element={<HomePage />} />
          <Route path="/films/*" element={<FilmsPage user={user} setMessage={setMessage} />} />
          <Route path="/signup" element={<SignupPage setMessage={setMessage} />} />
          <Route path="/login" element={<LoginPage login={login} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
