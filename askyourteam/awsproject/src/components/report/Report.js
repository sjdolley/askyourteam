import React, { Fragment, useEffect,  useRef, useState } from 'react';
import { getQuizzes, setQuizzes } from '../../services/quizServices';

export default function Report() {
  return(
    <div className="App">
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/report">Report</a></li>
      </ul>

      <h2>Results Report</h2>

      <a href="/edit">Edit this quiz</a>

      
      
      <p></p>
    </div>    
  );
}