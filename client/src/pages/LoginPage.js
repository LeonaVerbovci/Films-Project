import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import api from '../api';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LoginPage(props = {}) {
  const navigate = useNavigate;
  const submit = (user) =>
    api.users
      .login(user)
      .then((token) => {
        props.login(token);
        navigate('/films');
      })
      .catch((error) => console.log('Error during login:', error));

  return (
    <div className="ui grid">
      <div className="eight wide column ">
        <LoginForm submit={submit}></LoginForm>
      </div>
    </div>
  );
}
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};
export default LoginPage;
