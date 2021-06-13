const { updateQuestionDb } = require("../lib/questionDb");
module.exports.handler = async function updateQuestion(event) {
    const body = JSON.parse(event.body);
    console.log(body);

    return updateQuestionDb(body)
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