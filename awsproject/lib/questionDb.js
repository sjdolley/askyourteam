const AWS = require("aws-sdk");
const { arrayToList, normalizeData } = require("../lib/utils");

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
    let quizName = details.quizName;
    let questionID = details.questionID;
    let question_type = details.question_type;
    let question_body = details.question_body;
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
    
  const getAllQuestionswithQuizNameDb = async details => {
    console.log("Entering getallquizbynameDB");
    const quizName = details.quizName;
    console.log(quizName);
    
    const params = {
      TableName: questionTable,
      KeyConditionExpression: "quizName = :quizName",
      ExpressionAttributeValues: {
        ":quizName": quizName
      },
    }
   
    const data = await docClient.query(params).promise();
    console.log(data);
    return data;
   
  };

  const getQuestionbyIDDb = async details => {

    const theName = details.quizName;
    const theID = details.questionID;
    // const table = process.env.quizTable;

    const params = {
      TableName: questionTable,
      Key: {
        quizName: theName,
        questionID: theID,
      },
    }

    const data = await docClient.get(params).promise();

    console.log(data.Item);

    return data.Item;
  };

  const updateQuestionDb = async (details) => {
    var quizName = details.quizName;
    var questionID = details.questionID;
    var question_type = details.question_type;
    var question_body = details.question_body;
    var question_type = details.question_type;
    var correctAnswer = details.correctAnswer;
    var answer1_body = details.answer1_body;
    var answer2_body = details.answer2_body;
    var answer3_body = details.answer3_body;
    var answer4_body = details.answer4_body;
    var answer5_body = details.answer5_body;    
     
  // add validation to check if quiz already exists with this name
    const params = {
      TableName: questionTable,
      Key: {
          quizName: quizName,
          questionID: questionID,
      },
      UpdateExpression: "SET question_type = :question_type, question_body = :question_body, answer1_body = :answer1_body, answer2_body = :answer2_body, answer3_body = :answer3_body, answer4_body = :answer4_body, answer5_body = :answer5_body, correctAnswer = :correctAnswer",
      ExpressionAttributeValues: {
          ":question_type": question_type,
          ":question_body": question_body,
          ":correctAnswer": correctAnswer,
          ":answer1_body": answer1_body,
          ":answer2_body": answer2_body,
          ":answer3_body": answer3_body,
          ":answer4_body": answer4_body,
          ":answer5_body": answer5_body
      },
      ReturnValues:"UPDATED_NEW"
    };
   
    const output = await docClient.update(params).promise();
    
    return { statusCode: 200, body: JSON.stringify(output) } 
};



const getAnswersByQuizName = async details => {
  quizName = details.quizName;

  // query the table with quizname to get all the questions
  data = await getAllQuestionswithQuizNameDb(details);

  const correctAnswers = data.Items.map((value) => value.correctAnswer);
  console.log(correctAnswers, "CORRECT ANSWERS"); 

  return normalizeData(correctAnswers)
  // [["a","D"],["a"],]

  
  // let correctAnswerArray = [];
  // // convert the returned object to an array
  // const questions = data
  // console.log("Questions", questions);

  // // iterate through each question in the object and add the correctAnswer to the array
  // for (i=0; i<questions.length; i++) {
  //   correctAnswerArray[i] = questions[i].correctAnswer; 
  // }

  // // now we have an array turn it into a list so it can be used
  // let correctAnswerList = arrayToList(correctAnswerArray);
  // console.log(correctAnswerList, "correctanswerlist");
  // return correctAnswerList;
}

  module.exports = {
    createDbQuestion,
    deleteDbQuestion,
    getAllQuestionswithQuizNameDb,
    getQuestionbyIDDb,
    updateQuestionDb,
    getAnswersByQuizName
};