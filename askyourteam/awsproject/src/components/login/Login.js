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


// export default class MyForm extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { data: { emailAddress: "example@gmail.com" } };
//     this._onPressButton = this._onPressButton.bind(this)
//   }

//   _onPressButton() {
//     const validationResult = validate(this.state.data, constraints);
//     // validationResult is undefined if there are no errors
//     this.setState({ errors: validationResult });
//   }

//   render() {
//       return (
//         <View>
//           <TextInput
//             onChangeText={(email) => (
//               this.setState({
//                 ...this.state,
//                 data: {
//                   ...this.state.data,
//                   emailAddress: email
//                 }
//               })
//             )}
//             value={this.state.data.emailAddress}
//           />

//           <TouchableHighlight onPress={this._onPressButton}>
//             <Text>Submit</Text>
//           </TouchableHighlight>

//           {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text>{errorMessage}</Text>)}

//           <Text>
//             {this.getErrorMessages()}
//           </Text>
//         </View>
//       );
//   }

//   getErrorMessages(separator="\n") {
//     const { errors } = this.state;
//     if (!errors) return [];

//     return Object.values(errors).map(it => it.join(separator)).join(separator);
//   }

//   getErrorsInField(field) {
//     const { errors } = this.state;
//     return errors && errors[field] || [];
//   }

//   isFieldInError(field) {
//     const { errors } = this.state;
//     return errors && !!errors[field];
//   }
// }





export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //Client Side Validation for email
  

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
