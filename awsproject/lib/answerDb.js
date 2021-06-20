const AWS = require("aws-sdk");
const { getAnswersByQuizName } = require("../lib/questionDb");
const { mark } = require("../lib/analyticsDb");
const { toArray } = require("../lib/utils");

const questionTable = process.env.questionTable;
// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const answerTable = process.env.answerTable;

const logQuizAnswersDb = async details => {
    // set up the variables
    console.log("in quiz answers");
    console.log(details);
    const quizName = details.quizName;
    const demoAnswers = toArray(details.demoAnswers);
    const answers = details.answers; // leave answers as a list to insert into the next table
    const correctAnswers = await getAnswersByQuizName(details);
    console.log(correctAnswers);
    // get the mark of the quiz
    result = mark(correctAnswers, answers);
    console.log(mark);

    // store the demo question data, we know from the business rules that there will be 3 demo questions
    const params = {
        TableName: answerTable,
        Item: {
            quizName: quizName,
            demoQuestion1Answer: demoAnswers[0],
            demoQuestion2Answer: demoAnswers[1],
            demoQuestion3Answer: demoAnswers[2],
            answers: answers,
            mark: result,
        }
    }

    await docClient.put(params).promise();
    return {statusCode: 200, body: JSON.stringify(params)}
}


    



module.exports = {
    logQuizAnswersDb
};