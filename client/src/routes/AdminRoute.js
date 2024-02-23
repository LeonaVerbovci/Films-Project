import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ user, render, ...rest }) => {
  return (
    <Route>
      {...rest}
      render ={' '}
      {(props) => (user.token && user.role === 'admin' ? render(props) : <Redirect to="/films" />)}
    </Route>
  );
};

AdminRoute.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string,
  }),
  render: PropTypes.func.isRequired,
};
export default AdminRoute;
