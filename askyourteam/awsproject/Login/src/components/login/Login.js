import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import { Text, View, TextInput, TouchableHighlight } from 'react-native';
//import { validate } from 'validate.js';
import './Login.css';
//import constraints from '../../constraints';
import headerLogo from '../header/AYT-Logo.png';
import footerLogo from '../footer/footer-logo.PNG';



async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Submit Form
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  return(
    <div className="wrapper app">    
      <div className="header">
              <footer>
                  <div class="app-header">                   
                      <img src={headerLogo} alt="Ask Your Team Logo" class="logo header-logo" />
                      <p class="horizontal-rule"> | </p>                    
                      <p class="running-text">
                          Quiz  
                      </p> 
                  </div>
              </footer>
          </div>

      <div className="login-wrapper">
        <h1>Admin Login</h1>
        <p>To get an account please contact your company's office or IT department.</p>

        <form onSubmit={handleSubmit}>
          <label>
            <p>Email Address</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit" className="form-btn">Submit</button>
          </div>
        </form>
      </div>

      <div className="footer">
        <footer>
            <div class="app-footer">                   
                <img src={footerLogo} alt="Ask Your Team Logo" class="logo" />
                {/* <p class="horizontal-rule"> | </p>                    
                <p class="running-text">
                    Quiz
                </p>                     */}
            </div>
        </footer>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
