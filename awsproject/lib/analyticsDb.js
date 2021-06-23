const AWS = require("aws-sdk");
const { getQuestionbyIDDb } = require("../lib/questionDb");
const { toArray } = require("../lib/utils");


const questionTable = process.env.questionTable
const quizTable = process.env.quizTable
// INIT AWS
// AWS.config.update({
//   region: "us-east-1"
// });

const docClient = new AWS.DynamoDB.DocumentClient();

const answerTable = process.env.answerTable;
// const markQuizDb = async details => {
//     // validation for package
//     let question = [];
//     let answers = [];
//     var dummy, dummy2;
//     var total = 0;
//     for ( i=0; i = 500; i++) {
//         dummy = details.Items[i];
//         if (dummy != null) { 
//             question[i] = dummy;
//             total++;
//         } else { i= 499; }
//         for (j=0; j=500; j++) {
//             dummy2 = details.Items[i].Items[j];
//             if (dummy2 != null) {
//                 answers[j] = dummy2;
//             } else { j =499; }
//         }
    
//     for ( i=0; i<total; i++) {
//         stuff = await getQuestionByIDDb({ "questionID": i });
//         var correctAnswers = stuff.correctAnswer;
      

//     }
// }}

// { "questionID": [A,B,C]}

const markQuizDb2 = async details => {
    // var obj = JSON.parse(details);
    const quizName = details.quizName;
    delete details[quizName]; // remove the quiz name from the data just leaving the answers

    var questionArray = Object.keys(details);
    console.log("In the function");
    let marks = 0;
    let questions = 0;
    
        for (var i = 0; i<questionArray.length; i++) {
            var answerNumber = questionArray[i];
            var answer = details[answerNumber];
            console.log(answerNumber, answer);
            // code above here works
            questions++;
            var j = {
                "questionID": j
            };
            correctPackage = await getQuestionbyIDDb(j);
            correctAnswerArray = object.keys(correctPackage.correctAnswer);
            if (compareLists == 0) { marks++; }
        }

    mark = mark/questions*100;
    // update question table here with BI information
    
    return { statusCode: 200, body: mark }
}

// upon revision of marking compare lists is no longer a required function
const compareLists = function compare(listA, listB) {
    if (Array.isArray(listA)) {
        if (Array.isArray(listB)) {
            if (listA.length == 0) {
                if (listB.length == 0) {
                    return 0;
                } else {
                    return -1;
                }
            } else {
                if (listB.length == 0) {
                    return +1;
                } else {
                    return compare(listA[0], listB[0]) || 
                           compare(listA.slice(1), listB.slice(1));
                }
            }
        } else {
            return -1; // arbitrary decision: arrays are smaller than scalars
        }
    } else {
        if (Array.isArray(listB)) {
            return +1; // arbitrary decision: scalars are larger than arrays
        } else {
            return listA < listB ?  -1 : listA > listB ? + 1 : 0;
        }
    } //should answer 0 if the lists are the same. any other result (-1,1) should get 0 marks
};

<<<<<<< HEAD

/* need to set schema for the storage still of this data in the quiz table
    ("demographicData": [
        "Question1": ["A": "value",
                      "B": "value",
                      "C": "value",
                      "D": "value",
                      "E": "value"],
        "Question2": ["A": "value",
                      "B": "value",
                      "C": "value",
                      "D": "value",
                      "E": "value"],
        "Question3": ["A": "value",
                      "B": "value",
                      "C": "value",
                      "D": "value",
                      "E": "value"],
    ]
                }

*/
const receiveDemoDb = async details => {
    const quizName = details.quizName;
    const demoQuestion1 = details.demoQuestion1;
    const demoQuestion2 = detail.demoQuestion2;
    const demoQuestion3 = detail.demoQuestion3;
    const 
    params = {
        TableName: quizTable,
        Key: { quizName: quizName
        },
        UpdateExpression="SET demographicData[0].question.value = :newvalue + :inc",
        ExpressionAttributeNames {
            :newvalue: 
        }
        ExpressionAttributeValues={        
            ':inc': '1' }, 
    } 
=======
function mark (correctAnswers, answers) {
    console.log("entering mark function");
    console.log("correctAnswers",correctAnswers);
    // correctAnswers and asnwers should be passed as lists so we will turn them into arrays
    correctAnswersArray = toArray(correctAnswers);
    answersArray = toArray(answers);
    let marks=0;
    let total=0;    
    // all our answers are stored as lists so we need to compare lists to see if the answer is right
    // business rules indicate 0 or 1 mark per question, so they need all options correct

    // check if the user answer is inside the allowed answers
    // userAnswer.filter(answer => questionAnswer.includes(userAnswer))

    // [["A"],["A","C"],["B"],["A","D"]]
    for (i=0; i<answersArray.length; i++) {
        console.log(JSON.stringify(correctAnswersArray[i]));
        console.log(JSON.stringify(answersArray[i]));
        if (JSON.stringify(correctAnswersArray[i]) === JSON.stringify(answersArray[i])) {
            marks = marks+1;
            console.log("Mark", marks);
        }
        total=total+1;
    }
    let mark = Math.round((marks/total)*100);
    return mark;
}

const leaderboardDb = async details => {
    const quizName = details.quizName;
    console.log(quizName);
    params = {
        TableName: answerTable,
        IndexName: "IndexMark",
        KeyConditionExpression: ":n = quizName",
        ExpressionAttributeValues: {
            ":n": quizName
        },
        ScanIndexForward: false,
        Limit: 5
    };

    let data = await docClient.query(params).promise();
    return {statusCode: 200, body: JSON.stringify(data)}
>>>>>>> a66fcaccde5851b43a36f0ad86d6ba7d7624e348
}

module.exports = { 
    markQuizDb2,
<<<<<<< HEAD
    receiveDemoDb
=======
    mark,
    leaderboardDb
>>>>>>> a66fcaccde5851b43a36f0ad86d6ba7d7624e348
};