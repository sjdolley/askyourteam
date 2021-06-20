const { leaderboardDb } = require("../lib/analyticsDb");

module.exports.handler = async function markQuiz(event) {
        console.log("in the handler");
        const body = event.queryStringParameters;
        // const body = JSON.parsr(event.body);
        console.log(body);
        return leaderboardDb(body)
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
