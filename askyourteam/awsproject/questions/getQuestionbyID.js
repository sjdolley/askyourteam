const { getQuestionbyIDDb } = require("../lib/questionDb");
module.exports.handler = async function getQuestionbyID(event) {
    const body = event.queryStringParameters;
    console.log(body);

    return getQuestionbyIDDb(body)
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