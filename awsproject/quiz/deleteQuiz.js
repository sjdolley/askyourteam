const deleteDbQuiz = require ("../lib/quizDb");

module.exports.handler = async function deleteQuiz(event) {
    console.log(event.body);
    
    const body = JSON.parse(event.body);
        console.log(event.body);
        return deleteDbQuiz(body)
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