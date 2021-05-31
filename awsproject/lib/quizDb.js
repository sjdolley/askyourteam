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
  
 
  
module.exports = {
    publishDbQuiz
};