// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const { publishDbQuiz } = require("../lib/quizDb");
const Validator = require("jsonschema").Validator;

// INIT AWS
AWS.config.update({
  region: "us-east-1",
});

module.exports.handler = async function publishQuiz(event) {
  console.log(event.body);
  const detail = JSON.parse(event.body);

  // schema validation on incoming payload
  let v = new Validator();

  let schema = {
    $schema: "http://json-schema.org/draft-09/schema#",
    id: "publishQuiz",
    properties: {
      email: {
        type: "string",
        format: "email",
        minLength: 6,
        maxLength: 127,
      },
      quizName: {
        type: "string",
        minLength: 5,
        maxLength: 16,
      },
      endDate: {
        type: "string",
        format: "date",
      },
      required: ["email", "quizName"],
      additionalProperties: false,
    },
  };
  // v.addSchema(schema, schema["/registrationPayload"]);
  let validation = v.validate(event, schema);

  if (validation.errors.length > 0) {
    console.log(validation);
    return {
      statusCode: 409,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { "validation error": validation.errors },
    };
  }

  return publishDbQuiz(detail)
    .then((user) => ({
      statusCode: 200,
      body: JSON.stringify(user),
    }))
    .catch((err) => {
      console.log({ err });

      return {
        statusCode: err.statusCode || 500,
        headers: { "Content-Type": "text/plain" },
        body: { stack: err.stack, message: err.message },
      };
    });
};
