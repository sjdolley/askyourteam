import React from 'react';

export default function Edit() {
  return(
    <div className="App">
      <ul className="breadcrumbs">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/report">Report</a></li>
        <li><a href="/edit">Edit</a></li>
      </ul>

      <h2>Edit Quiz</h2>

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