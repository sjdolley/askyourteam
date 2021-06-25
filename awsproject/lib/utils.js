// ./lib/utils.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../lib/db");

async function signToken(user) {
  const secret = Buffer.from(process.env.JWT_SECRET, "base64");

  return jwt.sign({ email: user.email, id: user.id, roles: ["USER"] }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
}

async function login(args) {
  try {
    const user = await getUserByEmail(args.email);

    const isValidPassword = await comparePassword(
      args.password,
      user.passwordHash
    );

    if (isValidPassword) {
      const token = await signToken(user);
      return Promise.resolve({ auth: true, token: token, status: "SUCCESS" });
    }
  } catch (err) {
    console.info("Error login", err);
    return Promise.reject(new Error(err));
  }
}

function comparePassword(eventPassword, userPassword) {
  console.log(eventPassword, userPassword);
  return bcrypt.compare(eventPassword, userPassword);
}

async function getUserFromToken(token) {
  console.log("we are in getUserFromToken");
  const secret = Buffer.from(process.env.JWT_SECRET, "base64");
  console.log(secret);
  const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
  console.log(decoded);
  return decoded;
}

function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
}

const normalizeData = (data) => {
  return data.map((value) => {
    if (!Array.isArray(value)) return [value];
    return value;
  });
};

function toArray(obj) {
  var array = [];
  // iterate backwards ensuring that length is an UInt32
  for (var i = obj.length >>> 0; i--; ) {
    array[i] = obj[i];
  }
  return array;
}

module.exports = {
  normalizeData,
  signToken,
  getUserFromToken,
  login,
  arrayToList,
  toArray,
};
