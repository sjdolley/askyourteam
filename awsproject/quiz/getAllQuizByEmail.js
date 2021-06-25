const { getAllQuizByEmailDb } = require("../lib/quizDb");

module.exports.handler = async function getAllQuizByEmail(event) {
  const body = event.queryStringParameters;
  console.log(body);

  return getAllQuizByEmailDb(body)
    .then((output) => ({
      statusCode: 200,
      body: JSON.stringify(output),
    }))
    .catch((err) => {
      console.log({ err });

      return {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: { stack: err.stack, message: err.message },
      };
    });
};

// curl -H "Content-Type: application/json" -X POST -d "{\"email\": \"test@example.com\"}" https://vvdof5ayyl.execute-api.us-east-1.amazonaws.com/dev/getAllQuizByEmail/{email}
