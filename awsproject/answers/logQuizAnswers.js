const { logQuizAnswersDb } = require("../lib/answerDb");

module.exports.handler = async function logQuizAnswers(event) {
  console.log(event.body);

  const body = JSON.parse(event.body);
  console.log(event.body);
  return logQuizAnswersDb(body)
    .then((user) => {
      console.log("IM PASSING YAY");
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    })
    .catch((err) => {
      console.log({ err });

      return {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: { stack: err.stack, message: err.message },
      };
    });
};
