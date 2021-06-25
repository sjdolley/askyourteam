// ./functions/testvalidatefunction.js
const { getUserByEmail } = require("../lib/db");
const { getUserFromToken } = require("../lib/utils");
const Validator = require("jsonschema").Validator;
module.exports.handler = async function me(event) {
  const userObj = await getUserFromToken(event.headers.Authorization);
  console.log(userObj);
  const dbUser = await getUserByEmail(userObj.email);
  console.log(dbUser);

  // validation of input
  // let schema = {
  //   "type": "string",
  //   "format": "email",
  //   "maxlength": 127,
  //   "minLenght": 5,
  // }

  // let validation = v.validate(body, schema);
 
  // if (validation.errors.length > 0){
  //     console.log(validation);
  //     return {
  //       statusCode: 409,
  //       headers: { "Access-Control-Allow-Origin": "*"},
  //       body: { "validation error": validation.errors }
  //     }
  // }

  console.log(JSON.stringify(dbUser));
  return {
    statusCode: 200,
    headers: {},
    body: dbUser
  };
};


