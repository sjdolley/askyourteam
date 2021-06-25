import React, { useEffect,  useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizByName } from '../../services/quizServices';
export const Report_Route = (quizName) => `/report/:${quizName}/`;
export const Edit_Route = (quizName) => `/edit/:${quizName}/`;

export default function Report() {
  const { quizName } = useParams();
  const [alert, setAlert] = useState(false);
  const [choosenQuiz, setChoosenQuiz] = useState([]);
  let mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if(choosenQuiz.length  && !alert) {
      return;
    }
    
    getQuizByName( { quizName })
      .then(quiz => {
        if(mounted.current) {
          setChoosenQuiz(quiz)
        }
      })
    return () => mounted.current = false;
  }, [alert, choosenQuiz])


  return(
    <div className="App">
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href={Report_Route(quizName)} params={{quizName: quizName}}>Report</a></li>
      </ul>

      <div className="title-line">
        <h3 className="quiz-name">{quizName}</h3>
        <a href={Edit_Route(quizName)} params={{quizName: quizName}}><button className="edit-btn">Edit this quiz</button></a>
      </div>
      

      

      {choosenQuiz.map((quiz) =>   (     
        <div className="display-quiz" key={quiz.questionID}>
            <h4>{quiz.question_body}</h4>

            <div className="display-quiz-answers">
              <button className="answer-btn">{quiz.answer1_body}</button>
              <button className="answer-btn">{quiz.answer2_body}</button>
              <button className="answer-btn">{quiz.answer3_body}</button>
              <button className="answer-btn">{quiz.answer4_body}</button>
            </div>          
          
        </div>
      ))}     
      
      <p></p>
    </div>    
  );
}