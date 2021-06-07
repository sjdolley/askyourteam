import React, { useState } from 'react';
import '../src/App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../src/components/dashboard/Dashboard';
import Login from '../src/components/login/Login';
import Preferences from '../src/components/preferences/Preferences';
import Header from "../src/components/header/Header"
import Footer from "../src/components/footer/Footer"

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {}

function App() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper app">
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard">
              <Dashboard />
            </Route>

          <Route path="/preferences">
            <Preferences />
          </Route>

        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;