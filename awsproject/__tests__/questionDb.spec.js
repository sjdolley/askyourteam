import { DynamoDB, awsSdkPromiseResponse } from '../__mocks__/aws-sdk';
import { createDbQuestion, deleteDbQuestion, getAllQuestionswithQuizNameDb, updateQuestionDb } from '../lib/questiondb';

// import MockDate from 'mockdate';
// const { v4: uuid } = require('uuid');
// note jest does not support es6 for importing, thus new syntax here


// beforeAll(() => {
//     MockDate.set("2021-6-20");   
// });

// jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));
// // const uuidMock = jest.fn().mockingImplementation(() => {
// //     return 'this-is-a-uuid-mock';
// // });
// // jest.mock('uuid', ()=> {
// //     return uuidMock;
// // });


// const db = new DynamoDB.DocumentClient();
// const quizTable = process.env.quizTable;
const questionTable = process.env.questionTable;
// describe('createDbQuiz test for valid data', () => {
//     test('save quiz', async () => {
//         const quiz = {
//             "email": "joe@example.com",
//             "quizName": "TesterQuiz",
//             "demographics": false,
//             "published": false,
//             "created": 2021-06-,
//             "id": '00000000-0000-0000-0000-000000000000'
//         }
//         // const response = {
//         //     quizName: "TesterQuiz"
//         // }
//         await createDbQuiz(quiz);
//         expect(db.put).toHaveBeenCalledWith({ TableName: quizTable, Item: quiz}); 
//     })
// });

const db = new DynamoDB.DocumentClient();

const quizTable = process.env.quizTable;
describe('createQuestion test for valid data', () => {
    test('save question', async () => {
        const quiz = {
            "quizName": "A Testing Quiz",
            "questionID": 1,
            "question_type": "M",
            "question_body": "How testy is a test?",
            "answer1_body": "Absurdly testy",
            "answer2_body": "very testy",
            "answer3_body": "quite testy",
            "answer4_body": "not really testy",
            "answer5_body": "not testy",
            "correctAnswer": ["A"],
            "correct_answers": 0,
            "completed_answers": 0
        }
        // const response = {
        //     quizName: "TesterQuiz"
        // }
        await createDbQuestion(quiz);
        expect(db.put).toHaveBeenCalledWith({ TableName: questionTable, Item: quiz}); 
    })
});

test('createQuestion test for invalid data', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
    expect.assertions(1);
    const quiz = {
        "questionID": 1,
        "question_type": "M",
        "question_body": "How testy is a test?",
        "answer1_body": "Absurdly testy",
        "answer2_body": "very testy",
        "answer3_body": "quite testy",
        "answer4_body": "not really testy",
        "answer5_body": "not testy",
        "correctAnswer": ["A"],
        "correct_answers": 0,
        "completed_answers": 0
    }
        try {
            await createDbQuestion(quiz);
        } catch (e) {
            expect(e.message).toBe('some error'); 
        }
    });

describe('deleteing a question', () => {
    test('question deletion', async () => {
        const question = {
            "quizName": "This is a Test Quiz",
            "questionID": 1
        }

        await deleteDbQuestion(question);
        expect(db.delete).toHaveBeenCalledWith({ TableName: questionTable, Key: question }); 
    })
})

test('delete question test for invalid data', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
    expect.assertions(1);
    const question = {
        "questionID": 1
    }
        try {
            await deleteDbQuestion(question);
        } catch (e) {
            expect(e.message).toBe('some error'); 
        }
    });


describe('getAllQuestionswithQuizNameDb method', () => {
    test('Get details of questions', async () => {
      const getparams = {
        "quizName": "A Test Quizname",
        "questionID": 1,
        "question_type": "M",
        "question_body": "How testy is a test?",
        "answer1_body": "Absurdly testy",
        "answer2_body": "very testy",
        "answer3_body": "quite testy",
        "answer4_body": "not really testy",
        "answer5_body": "not testy",
        "correctAnswer": ["A"],
        "correct_answers": 0,
        "completed_answers": 0
    }

    const queryparams = {
        "TableName": questionTable,
        "quizName": "A Test QuizName"
    }

    const params = {
        TableName: questionTable,
        KeyConditionExpression: "quizName = :quizName",
        ExpressionAttributeValues: {
          ":quizName": "A Test Quizname"
        },
      }
        awsSdkPromiseResponse.mockReturnValueOnce(Promise.resolve({ Item: getparams }));

      const questions = await getAllQuestionswithQuizNameDb(queryparams);
      expect(db.get).toHaveBeenCalledWith(params);
      expect(questions).toEqual(getparams);
    });
  });

  describe('updateQuestion test for valid data', () => {
    test('update question', async () => {
        const question = {
            "quizName": "A Testing Quiz",
            "questionID": 1,
            "question_type": "M",
            "question_body": "How testy is a test?",
            "answer1_body": "Absurdly testy",
            "answer2_body": "very testy",
            "answer3_body": "quite testy",
            "answer4_body": "not really testy",
            "answer5_body": "not testy",
            "correctAnswer": ["A"],
            "correct_answers": 0,
            "completed_answers": 0
        }

        const params = {
            TableName: questionTable,
            Key: {
                quizName: "A Testing Quiz",
                questionID: 1,
            },
            UpdateExpression: "SET question_type = :question_type, question_body = :question_body, answer1_body = :answer1_body, answer2_body = :answer2_body, answer3_body = :answer3_body, answer4_body = :answer4_body, answer5_body = :answer5_body, correctAnswer = :correctAnswer",
            ExpressionAttributeValues: {
                ":question_type": "M",
                ":question_body": "How testy is a test?",
                ":correctAnswer": ["A"],
                ":answer1_body": "Absurdly testy",
                ":answer2_body": "very testy",
                ":answer3_body": "quite testy",
                ":answer4_body": "not really testy",
                ":answer5_body": "not testy"
            },
            ReturnValues:"UPDATED_NEW"
          }
        // const response = {
        //     quizName: "TesterQuiz"
        // }
        await updateQuestionDb(question);
        expect(db.update).toHaveBeenCalledWith(params); 
    })
});

test('updateQuestion test for invalid data', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
    expect.assertions(1);
    const question = {
        "question_type": "M",
        "question_body": "How testy is a test?",
        "answer1_body": "Absurdly testy",
        "answer2_body": "very testy",
        "answer3_body": "quite testy",
        "answer4_body": "not really testy",
        "answer5_body": "not testy",
        "correctAnswer": ["A"],
        "correct_answers": 0,
        "completed_answers": 0
    }
        try {
            await updateQuestionDb(question);
        } catch (e) {
            expect(e.message).toBe('some error'); 
        }
    });