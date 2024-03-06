import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import SignUpForm from '../components/forms/SignUpForm';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

function SignUpPage({ setMessage }) {
  const navigate = useNavigate(); // Using useNavigate hook instead of useHistory

  const submit = (user) => {
    console.log('user', user);
    return api.users
      .create(user)
      .then(() => {
        setMessage('You have been successfully signed up');
        navigate('/login'); // Navigate to login page after successful signup
      })
      .catch((error) => console.error('Error during signup:', error));
  };

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignUpForm submit={submit} />
      </div>
    </div>
  );
}

SignUpPage.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default SignUpPage;
