const AWS = require("aws-sdk");

const quizTable = process.env.quizTable
const questionTable = process.env.questionTable
// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const createDbQuestion = async details => {
    // const quizName = details.quizName;
    // const email = details.email;
    const quizName = details.quizName;
    const questionID = details.questionID;
    const question_type = details.question_type;
    const question_body = details.question_body;
    let answer1_body = "";
    let answer2_body = "";
    let answer3_body = "";
    let answer4_body = "";
    let answer5_body = "";
    let correctAnswer = details.correctAnswer;
    if (question_type === "M") {
        answer1_body = details.answer1_body;
        answer2_body = details.answer2_body;
        answer3_body = details.answer3_body;
        answer4_body = details.answer4_body;
        answer5_body = details.answer5_body;    
    } 
    console.log(questionTable);
  // add validation to check if quiz already exists with this name
    const params = {
      TableName: questionTable,
      Item:{quizName: quizName,
      questionID: questionID,
      question_body: question_body,
      question_type: question_type,
      answer1_body: answer1_body,
      answer2_body: answer2_body,
      answer3_body: answer3_body,
      answer4_body: answer4_body,
      answer5_body: answer5_body,
      correctAnswer: correctAnswer,
      completed_answers: 0,
      correct_answers: 0
      }
    }
  
    console.log("create question with params", params);
  
    await docClient.put(params).promise();
  
    return { statusCode: 200, body: JSON.stringify(params)}
  };

  const deleteDbQuestion = async details => {
    const quizName = details.quizName;
    const questionID = details.questionID;
  
  
    const params = {
      TableName: questionTable,
      Key:{quizName: quizName,
          questionID: questionID,
      },
    }
  
    console.log("delete this quiz :-", params);
  
    await docClient.delete(params).promise();
  
    return { statusCode: 200, body: JSON.stringify(params)}
  };
    

  module.exports = {
    createDbQuestion,
    deleteDbQuestion
};