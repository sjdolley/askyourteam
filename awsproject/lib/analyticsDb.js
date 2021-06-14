const AWS = require("aws-sdk");
const { getQuestionbyIDDb } = require("../lib/questionDb")


const questionTable = process.env.questionTable
// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

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
    var questionArray = Object.keys(details);
    console.log("In the function");
    
        for (var i = 0; i<questionArray.length; i++) {
            var answerNumber = questionArray[i];
            var answer = details[answerNumber];
            console.log(answerNumber, answer);
            var j = {
                "questionID": j
            };
            correctPackage = await getQuestionbyIDDb(j);
            correctAnswerArray = object.keys(correctPackage.correctAnswer);
            for ()
        }
    
    )

}

module.exports = { 
    markQuizDb2
};