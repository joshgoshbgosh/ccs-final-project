import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function PrivateRoute({ isLoggedIn, ...props }) {
  return isLoggedIn
    ? <Route { ...props } />
    : <Redirect to='/login/'  />
}
export default PrivateRoute;
