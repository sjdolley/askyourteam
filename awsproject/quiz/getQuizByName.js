const { getQuizByNameDb } = require("../lib/quizDb");

module.exports.handler = async function getQuizByName(event) {
    console.log(event.body);
    
    const body = JSON.parse(event.body);
        console.log(event.body);
        return getQuizByNameDb(body)
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