const { updateQuestionDb } = require("../lib/questionDb");
const Validator = require("jsonschema").Validator;
module.exports.handler = async function updateQuestion(event) {
    const body = JSON.parse(event.body);
    console.log(body);

    let schema = {
      "$schema": "http://json-schema.org/draft-09/schema#",
      "id": "createQuestion", 
      "properties": {
        "quizName": {
          "minLength": 5,
          "maxLength": 16
        },
        "question_type": {
          "type": "string",
          "maxLength": 1
        },
        "question_body": {
          "type": "string",
          "minLength": 6,
          "maxLength": 100
        },
        "answer1_body": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        }, 
        "answer2_body": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "answer3_body": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "answer4_body": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "answer5_body": {
          "type": "string",
          "minLength": 1,
          "maxLength": 50
        },
        "correct_answer": {
          "minLength": 1,
          "maxLength": 1
        },
        "questionID": {
          "maxLength": 10,
          "minLength": 1
        },
        "required": ["quizName", "questionID"],
        "additionalProperties": false
      }
    }
    // v.addSchema(schema, schema["/registrationPayload"]);
    let validation = v.validate(body, schema);
   
    if (validation.errors.length > 0){
        console.log(validation);
        return {
          statusCode: 409,
          headers: { "Access-Control-Allow-Origin": "*"},
          body: { "validation error": validation.errors }
        }
    }

    return updateQuestionDb(body)
      .then(output => ({
        statusCode: 200,
        body: JSON.stringify(output)
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