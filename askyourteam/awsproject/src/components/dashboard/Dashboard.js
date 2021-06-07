import React, { useEffect,  useRef, useState } from 'react';
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
      <h2>Quiz Dashboard</h2>

      {quizzes.map(quiz =>
          <div className="dashboard-grid">
            <div className="grid-item item1">
              <h3 key={quiz.id}>{quiz.title}</h3>
              <p key={quiz.id}>{quiz.status}</p>
              <p key={quiz.id}>{quiz.creationDate}</p>
            </div>
          </div>)}
        
      {/* <div className="dashboard-grid">
        <div className="grid-item item1">
          {quizzes.map(quiz => <div className="grid-title" key={quiz.id}>{quiz.title}</div>)}
        </div>
      </div> */}

      {/* <div className="dashboard-grid">
        <div className="grid-item item1">
          <p className="grid-title">Quiz Title</p>
          <p>Status: Draft</p>
          <p className="quiz-creation-date">Created: dd/mm/yyyy</p>
        </div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
        <div className="grid-item">5</div>
        <div className="grid-item">6</div>
      </div> */}
      <button type="submit">Create New Quiz</button>
    </div>
  );
}

      