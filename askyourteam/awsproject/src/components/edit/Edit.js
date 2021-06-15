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
      <h3>Add a new question</h3>
      <div className="new-question-wrapper">
          <form>
              <label>
                  <p>Enter a new quiz question:</p>
                  <input type="text"></input>
                  <div id="answers">
                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="radio" id="answer-radio" value="answer1"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="radio" id="answer-radio" value="answer1"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="radio" id="answer-radio" value="answer1"></input>
                      </div>

                      <div className="an-answer">
                          <input type="text" id="answer-input"></input>
                          <input type="radio" id="answer-radio" value="answer1"></input>
                      </div>
                  </div>
              </label>
          </form>
      </div>

      
      
      <p></p>
    </div>    
  );
}