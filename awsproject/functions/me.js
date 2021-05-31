// ./functions/testvalidatefunction.js
const { getUserByEmail } = require("../lib/db");
const { getUserFromToken } = require("../lib/utils");

module.exports.handler = async function me(event) {
  const userObj = await getUserFromToken(event.headers.Authorization);
  console.log(userObj);
  const dbUser = await getUserByEmail(userObj.email);
  console.log(dbUser);
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(dbUser)
  };
};


