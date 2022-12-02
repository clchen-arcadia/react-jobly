import { useState, useEffect } from 'react';
import userContext from "./userContext.js";
import './App.css';
import RoutesList from './RoutesList';
import { BrowserRouter } from 'react-router-dom';
import Navigation from "./Navigation.js";
import JoblyApi from './JoblyAPI.js';
import jwt_decode from "jwt-decode";

/**
 * Renders the base App component.
 *
 * State: userInfo:
 *          {
 *            username,
 *            firstName,
 *            lastName,
 *            email,
 *            isAdmin,
 *            applications:[]
 *          }
 *
 *         token (str)
 *
 * Props: none
 *
 * App -> RoutesList
 */

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState("");


  /**
   * Every time the token state changes, function runs.
   * If token is not the empty string, an API call will be made and userInfo
   * will be updated.
   * If the token is the empty string, userInfo will be set to empty object.
   */

  useEffect(function handleChangeOfUser() {
    async function fetchUserInfo() {

      if (token !== "") {
        const tokenDecoded = jwt_decode(token);
        const { username } = tokenDecoded;
        console.log("TEST decoded token is>>>>", tokenDecoded);

        try {
          const res = await JoblyApi.getUserInfo(username);
          setUserInfo(() => res.user);
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      } else if (token === "") {
        setUserInfo(() => { });
      }

      console.log("hallelujah, useEffect has been invoked");
    }

    fetchUserInfo();
  }, [token]);


  /**
   *  Function called when login form submitted.
   *  Call static methods on JoblyApi
   *  Sets token state.
   */

  async function handleLogin(formData) {
    const res = await JoblyApi.loginUser(formData);
    setToken(() => res);
  }

  /**
   * Function called when Signup form is submitted.
   * Calls static method on JoblyApi.
   * Sets token state.
   */

  async function handleSignup(formData) {
    const res = await JoblyApi.registerNewUser(formData);
    setToken(() => res);
  }

  /**
   *  Function called when ProfileEdit form is submitted.
   *  Function calls JoblyApi static method to update user information.
   *  TODO: finish this
   */

  async function handleProfileEdit(formData) {
    const { firstName, lastName, email, username } = formData;
    const res = await JoblyApi.updateUserInfo(username, { firstName, lastName, email });
    //console.log("What is handleProfileEdit formData",formData, res);
    setUserInfo(userInfo => ({ ...userInfo, ...res.user }));
  }

  /**
   *  Function called when Logout button is clicked.
   *  Function sets the token state to the empty string.
   */

  function handleLogout() {
    setToken("");
  }

  return (
    <userContext.Provider value={userInfo}>
      <div className="App">
        <BrowserRouter>
          <Navigation
            username={userInfo.username}
            handleLogout={handleLogout}
          />

          <RoutesList
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleProfileEdit={handleProfileEdit}
          />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
