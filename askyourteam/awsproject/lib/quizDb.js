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
          email: email,
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
  
  const email = detail.email;
  const table = process.env.quizTable;
  console.log(table);
  
  const params = {
    TableName: table,
    KeyConditionExpression: 'searchEmail = :searchEmail',
    ExpressionAttributeValues: {
      ':searchEmail': email
    },
  }
  console.log("search by these parameters :-", params);

  await docClient.query(params).promise();

  return data.Items;
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

    await docClient.get(params).promise();

    console.log(data.Item);

    return data.Item;
  };

module.exports = {
    publishDbQuiz,
    deleteDbQuiz,
    getAllQuizByEmailDb,
    getQuizByNameDb
};