import React, { Fragment, useEffect,  useRef, useState } from 'react';
import { getQuizzes, setQuizzes } from '../../services/quizServices';

export default function Report() {
  // const [quizInput, setQuizInput] = useState('');
  // const [quizList, setQuizList] = useState([]);
  // let mounted = useRef(true);

  // useEffect(() => {
  //   mounted.current = true;
  //   if(quizList.length && !alert) {
  //     return;
  //   }
  //   getQuizzes()
  //     .then(quiz => {
  //       if(mounted.current) {
  //         setQuizList(quiz)
  //       }
  //     })
  //   return () => mounted.current = false;
  // }, [alert, quizList])



  return(
    <div className="App">
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/report">Report</a></li>
      </ul>

      <h2>Results Report</h2>
    </div>    
  );
}