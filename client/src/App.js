import React, { useEffect, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';
import TopNavigation from './components/TopNavigation';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import LoginPage from './pages/LoginPage';
import SingUpPage from './pages/SingUpPage';
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
  }, []); //ekzekutohet heren e pare kur renderohet komponenta

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
    <div className="ui container mt-3">
      <TopNavigation
        isAuth={user.token}
        logout={logout}
        isAdmin={user.token && user.role === 'admin'}
      />

      {message && (
        <div className="ui info message">
          <i className="close icon" onClick={() => setMessage('')}></i>
        </div>
      )}
      <Route excat path="/" component={HomePage} />
      <Route path="/films" render={(props) => <FilmsPage user={user} {...props} />} />
      <Route path="/film/:_id" component={Film} />
      <Route path="/signup" render={(props) => <SingUpPage {...props} setMessage={setMessage} />} />
      <Route path="/login" render={(props) => <LoginPage {...props} login={login} />} />
    </div>
  );
}

export default App;
