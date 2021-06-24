const { deleteDbQuestion } = require ("../lib/questionDb");
const Validator = require("jsonschema").Validator;


module.exports.handler = async function deleteQuestion(event) {
    console.log(event.body);
    
    let v = new Validator();
  
  let schema = {
    "$schema": "http://json-schema.org/draft-09/schema#",
    "id": "registration", 
    "properties": {
      "quizName": {
        "type": "string",  
        "minLength": 6,
        "maxLength": 50,
      },
      "questionID": {
        "minLength": 5,
        "maxLength": 16,
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


    const body = JSON.parse(event.body);
        console.log(event.body);
        return deleteDbQuestion(body)
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