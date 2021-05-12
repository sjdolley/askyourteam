// ./lib/utils.js
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
    return bcrypt.compare(eventPassword, userPassword);
  }

  // ./lib/utils.js
async function getUserFromToken(token) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");
  
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
  
    return decoded;
  }