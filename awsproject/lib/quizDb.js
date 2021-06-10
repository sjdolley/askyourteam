const AWS = require("aws-sdk");

const quizTable = process.env.quizTable

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();


const publishDbQuiz = async (details) => {
    const theQuiz = details.quizName;
    console.log(theQuiz);
    const theEmail = details.email;
    const endDate = details.endDate;
    const table = process.env.quizTable;
    const pubDate = Date();
    console.log(table);
    console.log

  // add validation to check if quiz already exists with this name
    const params = {
      TableName: table,
      Key: {
          quizName: theQuiz,
          email: theEmail,
      },
      UpdateExpression: "SET published = :published, #endDate = :endDate, #publishedDate = :publishedDate",
      ExpressionAttributeNames: {
        "#publishedDate": "publishedDate",
        "#endDate": "endDate"
      },
      ExpressionAttributeValues: {
          ":published": true,
          ":endDate": endDate,
          ":publishedDate": pubDate
      },
      ReturnValues:"UPDATED_NEW"
    };
   
    await docClient.update(params).promise();
    
    return { statusCode: 200, body: JSON.stringify(params) } 
};
  
const deleteDbQuiz = async details => {
  const quizName = details.quizName;
  const email = details.email;

  const table = process.env.quizTable;
  console.log(table);
// add validation to check if quiz already exists with this name
  const params = {
    TableName: table,
    Key:{quizName: quizName,
        email: email,
    },
  }

  console.log("delete this quiz :-", params);

  await docClient.delete(params).promise();

  return { statusCode: 200, body: JSON.stringify(params)}
};
  
const getAllQuizByEmailDb = async details => {
  console.log("Entering getallquizbyemailDB");
  const frank = details.email;
  console.log(frank);
  
  // need to fix environment variables in stage to fix this
  // const table = process.env.quizTable;
  
  
  const params = {
    TableName: quizTable,
    IndexName: "emailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": frank
    },
  }
 
  const data = await docClient.query(params).promise();
  console.log(data);
  return data;
 
};

  const getQuizByNameDb = async details => {

    const theName = details.quizName;
    const theUser = details.email;
    // const table = process.env.quizTable;

    const params = {
      TableName: quizTable,
      Key: {
        quizName: theName,
        email: theUser
      },
    }

    const data = await docClient.get(params).promise();

    console.log(data.Item);

    return data.Item;
  };

module.exports = {
    publishDbQuiz,
    deleteDbQuiz,
    getAllQuizByEmailDb,
    getQuizByNameDb
};