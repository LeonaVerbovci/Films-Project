import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const TopNavigation = ({ isAuth, logout, isAdmin }) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        Home
      </NavLink>
      <NavLink to="/films" className="item">
        Films
      </NavLink>
      {isAdmin && (
        <NavLink to="/films/new" className="item">
          <i className="icon plus" />
          Add new film
        </NavLink>
      )}
      {isAuth ? (
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
          <NavLink to="/login" className="item"></NavLink>
        </div>
      )}
    </div>
  );
};

TopNavigation.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

export default TopNavigation;
