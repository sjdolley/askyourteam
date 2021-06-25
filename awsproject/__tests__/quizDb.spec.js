import { DynamoDB, awsSdkPromiseResponse } from '../__mocks__/aws-sdk';
const { deleteDbQuiz, updateDemographicsDb } = require("../lib/quizDb");
const quizTable = process.env.quizTable;
const db = new DynamoDB.DocumentClient();

describe('deleteing a quiz', () => {
    test('quiz', async () => {
        const quiz = {
            "quizName": "This is a Test Quiz",
            "email": "donket@silly.com"
        }

        await deleteDbQuiz(quiz);
        expect(db.delete).toHaveBeenCalledWith({ TableName: quizTable, Key: quiz }); 
    })
})

test('delete question test for invalid data', async () => {
    awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
    expect.assertions(1);
    const question = {
        "email": "pallapolozi@nono.com"
    }
        try {
            await deleteDbQuiz(question);
        } catch (e) {
            expect(e.message).toBe('some error'); 
        }
    });

    describe('updateQuiz demographics for valid data', () => {
        test('update to add in demographics questions to the quiz', async () => {
            const quiz = {
                "quizName": "TestQuiz",
                "email": "snailspees@coding.com",
                "demographics": "demographics"
            }
    
            const params = {
                TableName: quizTable,
                Key: {
                    quizName: "TestQuiz",
                    email: "snailspees@coding.com"
                },
                UpdateExpression: "SET demographics = :demographics",
                ExpressionAttributeValues: {
                    ":demographics": "demographics",
                },
                ReturnValues:"UPDATED_NEW"
              }
        
            await updateDemographicsDb(quiz);
            expect(db.update).toHaveBeenCalledWith(params); 
        })
    });
    
    test('updateQuestion test for invalid data', async () => {
        awsSdkPromiseResponse.mockReturnValueOnce(Promise.reject(new Error('some error')));
        expect.assertions(1);
        const quiz = {
            "quizName": "TestQuiz",
            "email": "snailspees@coding.com",
            "demographics": true
        }
            try {
                await updateDemographicsDb(quiz);
            } catch (e) {
                expect(e.message).toBe('some error'); 
            }
        });