import { DynamoDB } from '../__mocks__/aws-sdk';
import { createDbQuiz } from '../lib/db';
// note jest does not support es6 for importing, thus new syntax here

const db = new DynamoDB.DocumentClient();

describe('getUserByEmail test for valid data', () => {
    test('save user', async () => {
        const user = {
            "email": "joe@example.com"
            
        }
        const response = {
            quizName: "TesterQuiz"
        }
        await createDbUser(user);
        expect(db.put).toHaveBeenCalledWith({Item: user}) 
    })
});
