import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
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
                  <div className="app-header">                   
                      <img src={headerLogo} alt="Ask Your Team Logo" className="logo header-logo" />
                      <p className="horizontal-rule"> | </p>                    
                      <p className="running-text">
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
            <input type="email" onChange={e => setEmail(e.target.value)} required />
          </label>
          
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} required />
          </label>
          <div>
            <button type="submit" id="create-quiz-btn">Submit</button>
          </div>
        </form>
      </div>

      <div className="footer">
        <footer>
            <div className="app-footer">                   
                <img src={footerLogo} alt="Ask Your Team Logo" className="logo" />
                {/* <p className="horizontal-rule"> | </p>                    
                <p className="running-text">
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
