import React, { Fragment, useEffect,  useRef, useState } from 'react';
import { getQuizzes, setQuizzes } from '../../services/quizzes';
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>

export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [quizInput, setQuizInput] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  let mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if(quizzes.length && !alert) {
      return;
    }
    getQuizzes()
      .then(quiz => {
        if(mounted.current) {
          setQuizzes(quiz)
        }
      })
    return () => mounted.current = false;
  }, [alert, quizzes])

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        if(mounted.current){
          setAlert(false);
        }
      }, 1000)
    }
  }, [alert])

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuizzes()
      // .then(() => {
      //   if(mounted.current) {
      //     setQuizInput('');
      //     setAlert(true);
      //   }        
      // })
  };

  return(
    <div className="App dashboard-wrapper">
      <p>Dashboard/</p>
      <div className="title-line">
        <h1 id="dashboard-title">Quiz Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="new-quiz-btn" onClick="handleSubmit">Create New Quiz</button>
        </form>
      </div>      
      <div className="dashboard-grid">
        {quizzes.map(quiz =>            
          <div className="grid-item">
            <h3 key={quiz.id}>{quiz.title}</h3>
            <p key={quiz.id}>Status: {quiz.status}</p>
            <p key={quiz.id}>Created: {quiz.creationDate}</p>

            {quiz.status === "Published" ? 
              <Fragment>
                <p key={quiz.id}>Published: {quiz.publishDate}</p>
                <button className="report-btn">Results Report</button>
              </Fragment> : null}

            {quiz.status === "Closed" ? 
              <Fragment>
                <p key={quiz.id}>Published: {quiz.publishDate}</p>
                <p key={quiz.id}>Closed: {quiz.closingDate}</p>
                <button className="report-btn">Results Report</button>
              </Fragment> : null}
          </div>)}
      </div>
    </div>
  );
}

      