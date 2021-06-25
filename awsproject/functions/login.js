// ./functions/login.js
const { login } = require("../lib/utils");
const Validator = require("jsonschema").Validator;
module.exports.handler = async function signInUser(event) {
  const body = JSON.parse(event.body);

  let v = new Validator();
  
  let schema = {
    "$schema": "http://json-schema.org/draft-09/schema#",
    "id": "registration", 
    "properties": {
      "email": {
        "type": "string", 
        "format": "email", 
        "minLength": 6,
        "maxLength": 127
      },
      "password": {
        "minLength": 5,
        "maxLength": 16
      },
      "required": ["email", "password"],
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


  return login(body)
    .then(session => ({
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(session),
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

