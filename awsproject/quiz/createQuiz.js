const { createDbQuiz } = require("../lib/db");

module.exports.handler = async function createQuiz(event) {
    console.log(event.body);
    
    const body = JSON.parse(event.body)
        console.log(event.body);
        return createDbQuiz(body)
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
