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
    } //should answer 0 if the lists are the same. any other result (-1,1) chould get 0 marks
};

module.exports = { 
    markQuizDb2
};