import React, { Fragment, useEffect,  useRef, useState, ChangeEvent } from 'react';
import { getQuizzes, setQuizzes } from '../../services/quizServices';
import { Link, useLocation } from 'react-router-dom';
export const Report_Route = (quizName) => `/report/:${quizName}/`;


export default function Dashboard(){
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
      
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>

      <div className="title-line">
        <h1 id="dashboard-title">Quiz Dashboard</h1>

        {alert && <h2 id="successful-alert"> * Quiz Creation Successful </h2>}
        <form id="create-quiz-form" onSubmit={handleSubmit}>
          <input type="text" id="create-quiz-input" onChange={event => setQuizInput(event.target.value)} value={quizInput} />
          <button type="submit" className="new-quiz-btn" onClick={handleSubmit}>Create New Quiz</button>
        </form>
      
      </div>
                
      <div className="dashboard-grid">
          {quizList.map((quiz) =>   (   
            <Link to={Report_Route(quiz.quizName)} params={{quizName: quiz.quizName}}>      
            <div className="grid-item" key={quiz.id}>
              
              <h3>{quiz.quizName}</h3>
              <p>Status: {quiz.status}</p>
              <p>Created: {quiz.creationDate}</p>

              {quiz.status === "Published" || quiz.status === "Closed" ? 
                <Fragment>
                  <p>Published: {quiz.publishDate}</p>
                </Fragment> : null
              }

              {quiz.status === "Closed" ? 
                <Fragment>
                  <p>Closed: {quiz.closingDate}</p>
                </Fragment> : null
              }

              {quiz.status === "Published" || quiz.status === "Closed" ? 
                <Fragment>                 
                  <a href="/report"><button className="report-btn">Results Report</button></a>
                </Fragment> : null
              }

            </div></Link>
          ))} 
      </div>
    </div>
  );
}

      