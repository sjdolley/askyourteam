const sls = require('serverless-http')
const AWS = require('aws-sdk')
const usersTable = process.env.usersTable
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: usersTable,
        Item: {
            email: data.email,
            password: data.password
        }
    }

    dynamoDb.put(params, (err) => {
        if (err) {
            console.log(err)
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, repsonse);
    });
}