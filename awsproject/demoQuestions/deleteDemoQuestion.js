const { deleteDbDemoQuestion } = require("../lib/demoDb");
const Validator = require("jsonschema").Validator;

module.exports.handler = async function deleteDemoQuestion(event) {
  console.log(event.body);

  const body = JSON.parse(event.body);

  // schema validation on incoming payload
  let v = new Validator();

  let schema = {
    $schema: "http://json-schema.org/draft-09/schema#",
    id: "registration",
    properties: {
      questionID: {
        minLength: 1,
        maxLength: 5,
      },
      required: ["questionID"],
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

  console.log(event.body);
  return deleteDbDemoQuestion(body)
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
