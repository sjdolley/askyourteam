const { createDbDemoQuestion } = require("../lib/demoDb");
const Validator = require("jsonschema").Validator;

module.exports.handler = async function createDemoQuestion(event) {

    
        const body = JSON.parse(event.body);
        
        let v = new Validator();
  
        let schema = {
          "$schema": "http://json-schema.org/draft-09/schema#",
          "id": "createQuestion", 
          "properties": {
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
            "questionID": {
              "maxLength": 10,
              "minLength": 1
            },
            "required": ["question_type", "question_body", "questionID"],
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

        return createDbDemoQuestion(body)
        .then(user => ({
          statusCode: 200,
          body: JSON.stringify(user)
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