const AWS = require("aws-sdk");

const quizTable = process.env.quizTable

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();


const publishDbQuiz = async (details) => {
    const email = details.email;
    console.log(email);
    const theQuiz = details.quizName;
    console.log(theQuiz);
    const table = process.env.quizTable;
    console.log(table);

  // add validation to check if quiz already exists with this name
    const params = {
      TableName: table,
      Key: {
          quizName: theQuiz,
      },
      UpdateExpression: "SET published = :published",
      ExpressionAttributeValues: {
          ":published": true,
      },
      ReturnValues:"UPDATED_NEW"
    };
   
    await docClient.update(params).promise();
    
    return { statusCode: 200, body: JSON.stringify(param) } 
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

    const quizName = details.quizName;
    const table = process.env.quizTable;

    const params = {
      TableName: table,
      Key: {
        "quizName": quizName,
      },
    }

    await docClient.query(params).promise();

    console.log(data.Item);

    return data.Item;
  };

module.exports = {
    publishDbQuiz,
    deleteDbQuiz,
    getAllQuizByEmailDb,
    getQuizByNameDb
};