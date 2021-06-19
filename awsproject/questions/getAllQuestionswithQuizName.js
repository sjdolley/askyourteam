const { getAllQuestionswithQuizNameDb } = require("../lib/questionDb");
module.exports.handler = async function getAllQuestionswithQuizName(event) {
    const body = event.queryStringParameters;
    console.log(body);

    return getAllQuestionswithQuizNameDb(body)
      .then(output => ({
        statusCode: 200,
        body: JSON.stringify(output)
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