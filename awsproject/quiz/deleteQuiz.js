const { deleteDbQuiz } = require("../lib/quizDb");
const Validator = require("jsonschema").Validator;

module.exports.handler = async function deleteQuiz(event) {
  console.log(event.body);

  // schema validation on incoming payload
  let v = new Validator();

  let schema = {
    $schema: "http://json-schema.org/draft-09/schema#",
    id: "createQuiz",
    properties: {
      email: {
        type: "string",
        format: "email",
        minLength: 6,
        maxLength: 127,
      },
      quizName: {
        minLength: 5,
        maxLength: 16,
      },
      required: ["email", "quizName"],
      additionalProperties: false,
    },
  };
  // v.addSchema(schema, schema["/registrationPayload"]);
  let validation = v.validate(body, schema);

  if (validation.errors.length > 0) {
    console.log(validation);
    return {
      statusCode: 409,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { "validation error": validation.errors },
    };
  }

  const body = JSON.parse(event.body);
  console.log(event.body);
  return deleteDbQuiz(body)
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
