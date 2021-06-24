const AWS = require("aws-sdk");
const { getAnswersByQuizName } = require("../lib/questionDb");
const { mark } = require("../lib/analyticsDb");
const { toArray } = require("../lib/utils");
const { v4: uuidv4 } = require("uuid");

const questionTable = process.env.questionTable;
// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

// const docClient = new AWS.DynamoDB.DocumentClient();
const answerTable = process.env.answerTable;

const logQuizAnswersDb = async details => {
    // set up the variables
    const docClient = new AWS.DynamoDB.DocumentClient();
    console.log("in quiz answers");
    console.log(details);
    const quizName = details.quizName;
    const demoAnswers = toArray(details.demoAnswers);
    const answers = details.answers; // leave answers as a list to insert into the next table
    const correctAnswers = await getAnswersByQuizName(details);
    console.log(correctAnswers);
    // get the mark of the quiz
    result = mark(correctAnswers, answers);
    console.log(result);

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
            id: uuidv4(),
        }
    }

    await docClient.put(params).promise();
    return {statusCode: 200, body: JSON.stringify(params)}
}

const getAnswersByScoreDb = async details => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const mark = details.mark;
    const quizName = details.quizName;
    
    const params = {
        TableName: answerTable,
        IndexName: "IndexMark",
        KeyConditionExpression: "quizName = :quizName",
        FilterExpression: "mark = :mark",
        ExpressionAttributeValues: {
            ":quizName": quizName,
            ":mark": mark,
        },
    }
    console.log(params);
    const response = await docClient.query(params).promise();
    console.log(response);
    return { statusCode: 200, body: JSON.stringify(response) } 
}






    



module.exports = {
    logQuizAnswersDb,
    getAnswersByScoreDb,
};