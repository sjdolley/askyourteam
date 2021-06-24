const { createDbUser } = require("../lib/db");
const Validator = require("jsonschema").Validator;

module.exports.handler = async function registerUser(event) {
  const body = JSON.parse(event.body);
  // schema validation on incoming payload
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
  console.log(validation.errors.length);
  if (validation.errors.length > 0){
      console.log(validation);
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body:  JSON.stringify(validation.errors) 
      }
        .then(user => ({
          statusCode: 200,
          body: JSON.stringify(user)
        }))
    }

  // Validation if user name exists
  const dbUser = await getUserByEmail(body.email);
  if(dbUser==null ){
    return {
      statusCode: 409,
      headers: { "Access-Control-Allow-Origin": "*"},
      body: { "validation error": "User Already Exists" }
    };
  }

  console.log(validation);
  console.log(validation.valid);

  
  console.log(event.body);
  return createDbUser(body)
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