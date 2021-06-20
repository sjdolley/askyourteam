import React, { Component } from 'react';
import '../src/App.css';
 
class Notfound extends Component {
  render() {
    return <div>
        <ul className="breadcrumbs">
            <li><a href="/dashboard">Dashboard</a></li>
        </ul>
        <div className="error-page">
            <h2>404</h2>
            <h4>Page Not Found!</h4>
            <p>Please navigate back to the dashboard page</p>
        </div>
    </div>
  }
}
 
export default Notfound;