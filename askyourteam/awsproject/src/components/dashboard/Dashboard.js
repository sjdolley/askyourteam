import React, { Fragment, useEffect,  useRef, useState } from 'react';
import { getQuizzes, setQuizzes } from '../../services/quizServices';
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>

export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [quizInput, setQuizInput] = useState('');
  const [quizList, setQuizList] = useState([]);
  let mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if(quizList.length && !alert) {
      return;
    }
    getQuizzes()
      .then(quiz => {
        if(mounted.current) {
          setQuizList(quiz)
        }
      })
    return () => mounted.current = false;
  }, [alert, quizList])

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
    <p>I've been clicked</p>
    e.preventDefault();

    setQuizzes(quizInput)
      .then(() => {
        if(mounted.current) {
          setQuizInput('');
          setAlert(true);
        }        
      })
  };

  return(
    <div className="App dashboard-wrapper">
      <p>Dashboard/</p>
      <div className="title-line">
        <h1 id="dashboard-title">Quiz Dashboard</h1>
      </div>
      
        {alert && <h2 id="successful-alert"> * Quiz Creation Successful </h2>}
        <form id="create-quiz-form" onSubmit={handleSubmit}>
          <label>
            <p>New Item</p>
            <input type="text" id="create-quiz-input" onChange={event => setQuizInput(event.target.value)} value={quizInput} />
          </label>
          <button type="submit" className="new-quiz-btn" onClick={handleSubmit}>Create New Quiz</button>
        </form>
      
       
      
         
      <div className="dashboard-grid">
          {quizList.map((quiz) =>   (         
            <div className="grid-item" key={quiz.id}>
              <h3>{quiz.title}</h3>
              <p>Status: {quiz.status}</p>
              <p>Created: {quiz.creationDate}</p>

              {quiz.status === "Published" || quiz.status === "Closed" ? 
                <Fragment>
                  <p>Published: {quiz.publishDate}</p>
                  <button className="report-btn">Results Report</button>
                </Fragment> : null}

              {quiz.status === "Closed" ? 
                <Fragment>
                  <p>Closed: {quiz.closingDate}</p>
                </Fragment> : null}
            </div>
          ))} 
      </div>
    </div>
  );
}

      