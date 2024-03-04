import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import SignUpForm from '../components/forms/SignUpForm';
import { useNavigate } from 'react-router-dom';

function SignUpPage(props) {
  const navigate = useNavigate;
  const submit = (user) => {
    api.users
      .create(user)
      .then(() => {
        props.setMessage('You have been successfully Signed up');
        navigate('/login');
      })
      .catch((error) => console.log('Error during singup:', error));
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
