const bcrypt = require("bcrypt");


async  function generateVerificationToken() {
    // Generate a random string
    const randomString = Math.random().toString(36).substring(2);

    // Hash the random string using bcrypt
    const token = await bcrypt.hash(randomString, 10); // 10 is the salt rounds

    return token;
}

module.exports = { generateVerificationToken };