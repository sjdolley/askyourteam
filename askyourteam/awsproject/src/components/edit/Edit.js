import React, { Fragment, useEffect,  useRef, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizByName, setQuizQuestionsByName } from '../../services/quizServices';
export const Report_Route = (quizName) => `/report/:${quizName}/`;
export const Edit_Route = (quizName) => `/edit/:${quizName}/`;

export default function Edit() {
  const { quizName } = useParams();
  const [choosenQuiz, setChoosenQuiz] = useState(['']);
  const [questionList, setQuestionList] = useState([]);
  let mounted = useRef(true);

  //Get the existing quiz questions
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
  }, [quizName, choosenQuiz])

  return(
    <div className="App">
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href={Report_Route(quizName)} params={{quizName: quizName}}>Report</a></li> 
        <li><a href={Edit_Route(quizName)} params={{quizName: quizName}}>Edit</a></li>
      </ul>

      <h2  className="quizName">Edit Quiz: {quizName}</h2>
      {choosenQuiz.map((quiz) =>   (     
        <div className="display-quiz"  key={quiz.questionID}>
            <h4>{quiz.question_body}</h4>

            <div className="display-quiz-answers">
              <button className="answer-btn" >{quiz.answer1_body}</button>
              <button className="answer-btn" >{quiz.answer2_body}</button>
              <button className="answer-btn" >{quiz.answer3_body}</button>
              <button className="answer-btn" >{quiz.answer4_body}</button>
            </div>          
          
        </div>
      ))}     

      <hr></hr>
      
      <div className="new-question-wrapper">
        <h3>Create a new quiz question:</h3>
          <form className="new-question-form">
              <label>
                  <p></p>
                  <input type="text" placeholder="Type your question here" id="question_input"></input>
                  <div id="answers">
                    <label>Type a possible answer in each box and select which answer or answers is correct</label>
                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="checkbox" id="answer-checkbox" value="answer1"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="checkbox" id="answer-checkbox" value="answer2"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="checkbox" id="answer-checkbox" value="answer3"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="checkbox" id="answer-checkbox" value="answer4"></input>
                      </div>
                  </div>
              </label>
              <button type="submit" id="new-question-submit-btn">Add question to quiz</button>
          </form>
      </div>

      
      
      <p></p>
    </div>    
  );
}