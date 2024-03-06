/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const AdminRoute = ({ user, element: Element, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        element={(props) =>
          user.token && user.role === 'admin' ? <Element {...props} /> : <Navigate to="/films" />
        }
      />
    </Routes>
  );
};

export default AdminRoute;
