// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const { publishDbQuiz } = require("../lib/quizDb"); 

const usersTable = process.env.usersTable
const quizTable = process.env.quizTable

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async function publishQuiz(event) {
      console.log(event.body);
  
      const detail = JSON.parse(event.body);
      console.log(detail);
      return publishDbQuiz(detail)
      .then(user => ({
        statusCode: 200,
        body: JSON.stringify(user)
      }))
      .catch(err => {
        console.log({ err });
  
        return {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: { stack: err.stack, message: err.message }
        };
      });
  
};


