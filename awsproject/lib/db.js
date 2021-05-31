
/*
// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { Model } = require("dynamodb-toolbox");
const { v4: uuidv4 } = require("uuid");

const User = new Model("User", {
  // Specify table name
  table: "usersTable",

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

  console.log("create user with params", params);

  const response = await docClient.put(params).promise();

  return User.parse(response);
};

const getUserByEmail = async email => {
  const params = User.get({ email, sk: "User" });
  const response = await docClient.get(params).promise();

  return User.parse(response);
};

module.exports = {
  createDbUser,
  getUserByEmail
};
*/





// Require AWS SDK and instantiate DocumentClient
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const usersTable = process.env.usersTable
const quizTable = process.env.quizTable

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const createDbUser = async details => {
  const email = details.email;
  const password = details.password;
  const passwordHash = await bcrypt.hash(password, 8); // hash the pass
  delete password; // eliminate the trace of the password
  
  const params = {
    TableName: usersTable,
    Item:{email: email,
    id: uuidv4(),
    passwordHash: passwordHash,
    createdAt: new Date()
    }
  }

  console.log("create user with params", params);

  await docClient.put(params).promise();

  return { statusCode: 200, body: JSON.stringify(params)}
};

const createDbQuiz = async details => {
  const quizName = details.quizName;
  const email = details.email
// add validation to check if quiz already exists with this name
  const params = {
    TableName: quizTable,
    Item:{quizName: quizName,
    email: email,
    id:uuidv4(),
    created: new Date(),
    published: false}
  }

  console.log("create quiz with params", params);

  await docClient.put(params).promise();

  return { statusCode: 200, body: JSON.stringify(params)}
} 

const getUserByEmail = async email => {
  
    console.log(email)
    // console.log(JSON.stringify(email));
    const params = {
      TableName: usersTable,
      Key: {
        "email" : email 
      }
    }
  const response = await docClient.get(params).promise();
  console.log(response)
  return response.Item;

};


/* const getUserByEmail = (event, context, callback) => {
  const package = event.email;
  console.log(email);
  const params = {
    TableName: "usersTable",
    Key: {
      email: package
    }
  };

  docClient.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Could not retrieve this Admin'));
      return;
    });
}; */


module.exports = {
  createDbUser,
  getUserByEmail,
  createDbQuiz
};














/*

// lib/db.js
'use strict';

const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const table = process.env.usersTable

// AWS.config.setPromisesDependency(require('bluebird'));

// INIT AWS
AWS.config.update({
  region: "us-east-1"
});
// init DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();



const createDbUser = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const email = requestBody.email;
  const password = requestBody.password;


// put some validation in here dumpkof

  submitUser(userInfo(email, password))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
        message: 'Success on Admin User with email ${email}',
        id: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Unable to submit Admin User with email ${email}'
        })
      })
    });
};

const submitUser = user => {
  console.log('Submitting Admin');
  const userInfo = {
    TableName: process.env.usersTable,
    Item: user,
  };
  return dynamoDB.put(userInfo).promise()
  .then(res => user);
};



const userInfo = (email, password) => {
  const passwordHash = await bcrypt.hash(password, 8);
  return {
    id: uuidv4(),
    email: email,
    password: passwordHash,
    createdAt: new Date()
  };
};


// console.log('Submitting User');

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



const getUserByEmail = (event, context, callback) => {
  const params = {
    TableName: process.env.usersTable,
    Key: {
      email: event.pathParameters.email,
    }
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Could not retrieve this Admin'));
      return;
    });
};


  // don't forget to export it
  module.exports = {
    createDbUser,
    getUserByEmail
  };
  */