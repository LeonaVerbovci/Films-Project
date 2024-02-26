import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ user, render, ...rest }) => {
  //This defines a functional component called AdminRoute
  //that accepts three props: user, render, and ...rest(rest of the props).
  return (
    <Route>
      {
        //This uses the spread operator to pass along any additional props (...rest) to the Route component.
        ...rest
      }
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
