import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import SignUpForm from '../components/forms/SignUpForm';

function SignUpPage(props) {
  const submit = (user) => {
    api.users
      .create(user)
      .then(() => props.setMessage('You have een successfully Signed up'))
      .then(() => props.history.push('/login'));
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default SignUpPage;
