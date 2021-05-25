const { updateDbQuizPublish } = require("../lib/db");

module.exports.handler = async function publishQuiz() {
    return updateDbQuiz();
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
}