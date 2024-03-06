// In TopNavigation component
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const TopNavigation = ({ isAuth, logout, isAdmin }) => {
  const isAuthenticated = isAuth || false;
  const isAdminUser = isAdmin || false;

  return (
    <div className="ui secondary pointing menu">
      <NavLink exact="true" to="/" className="item">
        Home
      </NavLink>
      <NavLink to="/films" className="item">
        Films
      </NavLink>
      {isAdminUser && (
        <NavLink to="/films/new" className="item">
          <i className="icon plus" />
          Add new film
        </NavLink>
      )}

      {isAuthenticated ? (
        <div className="right menu">
          <span className="item" onClick={logout}>
            Logout
          </span>
        </div>
      ) : (
        <div className="right menu">
          <NavLink to="/signup" className="item">
            Sign up
          </NavLink>
          <NavLink to="/login" className="item">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

TopNavigation.propTypes = {
  isAuth: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

export default TopNavigation;
