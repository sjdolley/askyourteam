const AWS = require("aws-sdk");

const demoQuestionTable = process.env.demoQuestionTable

// INIT AWS
AWS.config.update({
    region: "us-east-1"
  });
  
const docClient = new AWS.DynamoDB.DocumentClient();

const createDbDemoQuestion = async details => {
    
    let questionID = details.questionID;
    let question_type = details.question_type;
    let question_body = details.question_body;
    let answer1_body = details.answer1_body;
    let answer2_body = details.answer2_body;
    let answer3_body = details.answer3_body;
    let answer4_body = details.answer4_body;
    let answer5_body = details.answer5_body; 
  
    const table = process.env.quizTable;
    console.log(table);
  // add validation to check if quiz already exists with this name
    const params = {
        TableName: demoQuestionTable,
        Item:{ questionID: questionID,
        question_body: question_body,
        question_type: question_type,
        answer1_body: answer1_body,
        answer2_body: answer2_body,
        answer3_body: answer3_body,
        answer4_body: answer4_body,
        answer5_body: answer5_body
        }
      }
  
    console.log("create quiz with params", params);
  
    await docClient.put(params).promise();
  
    return { statusCode: 200, body: JSON.stringify(params)}
  };
  
  const deleteDbDemoQuestion = async details => {
    const questionID = details.questionID;
  
  
    const params = {
      TableName: demoQuestionTable,
      Key:{
          questionID: questionID,
      },
    }
  
    console.log("delete this quiz :-", params);
  
    await docClient.delete(params).promise();
  
    return { statusCode: 200, body: JSON.stringify(params)}
  };
  

  const getAllDemographicQuestionsDb = async  ()=> {
    
    // need to fix environment variables in stage to fix this
    // const table = process.env.quizTable;
    
    
    const params = {
      TableName: demoQuestionTable,
    }
   
    const data = await docClient.scan(params).promise();
    console.log(data);
    return data;
   
  };
  module.exports = {
      getAllDemographicQuestionsDb,
      createDbDemoQuestion,
      deleteDbDemoQuestion
  };