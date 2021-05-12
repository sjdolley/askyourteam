// lib/db.js

const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { Model } = require("dynamodb-toolbox");
const { v4: uuidv4 } = require("uuid");

const User = new Model("User", {
  // Specify table name
  table: "test-users-table",

  // Define partition and sort keys
  partitionKey: "pk",
  sortKey: "sk",

  // Define schema
  schema: {
    pk: { type: "string", alias: "email" },
    sk: { type: "string", hidden: true, alias: "type" },
    id: { type: "string" },
    passwordHash: { type: "string" },
    createdAt: { type: "string" }
  }
});

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});
// init DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

const createDbUser = async props => {
  const passwordHash = await bcrypt.hash(props.password, 8); // hash the pass
  delete props.password; // don't save it in clear text

  const params = User.put({
    ...props,
    id: uuidv4(),
    type: "User",
    passwordHash,
    createdAt: new Date()
  });

  const response = await docClient.put(params).promise();

  return User.parse(response);
};

// export it so we can use it in our lambda
module.exports = {
  createDbUser
};

const getUserByEmail = async email => {
    const params = User.get({ email, sk: "User" });
    const response = await docClient.get(params).promise();

    return User.parse(response);
  };

  // don't forget to export it
  module.exports = {
    createDbUser,
    getUserByEmail
  };