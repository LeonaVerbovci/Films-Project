import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/forms/LoginForm';
import api from '../api';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

function LoginPage({ login }) {
  const navigate = useNavigate(); // Using useNavigate hook instead of useHistory

  const submit = (user) =>
    api.users
      .login(user)
      .then((token) => {
        login(token);
        navigate('/films'); // Navigate to films page after successful login
      })
      .catch((error) => console.error('Error during login:', error));

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <LoginForm submit={submit} />
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
