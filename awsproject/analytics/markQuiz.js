const { markQuizDb2 } = require("../lib/analyticsDb");

module.exports.handler = async function markQuiz(event) {
  const body = JSON.parse(event.body);
  return markQuizDb2(body)
    .then((user) => ({
      statusCode: 200,
      body: JSON.stringify(user),
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
