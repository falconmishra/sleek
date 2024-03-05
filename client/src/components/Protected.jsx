import React from "react";
import { Route, Redirect } from "react-router-dom";

// Function to check if login token exists in cookie
const isLoggedIn = () => {
  // Implement logic to check if login token exists in the cookie
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token !== "";
};

function Protected({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default Protected;
