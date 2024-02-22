import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import api from '../api';
import PropTypes from 'prop-types';

function LoginPage(props = {}) {
  const submit = (user) =>
    api.users.login(user).then((token) => {
      props.login(token);
      props.history.push('/films');
    });

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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default LoginPage;
