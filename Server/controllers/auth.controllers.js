const jwt = require("jsonwebtoken")                                                                   // Import the jsonwebtoken library to create and verify JWTs

const createToken = async (req, res) => {
    try {
        const token = jwt.sign({ sub: "testing" }, "jgrskygchljc", { expiresIn: "1h" })                    // Create a JWT with a payload, secret key, and expiration time
        res.status(200).json({ message: "Token created successfully", token: token })
    } catch (err) {
        return res.status(500).json({ message: "Error creating token", error: err })
    }
}
const verifyToken = async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken)
      return res.status(401).json({ message: "No token provided" });

    const token = bearerToken.split(" ")[1];

    const decoded = jwt.verify(token, "jgrskygchljc");

    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - currentTime;

    return res.status(200).json({
      message: "authorized",
      session_expries_in: expiresIn,
    });
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};





module.exports = { createToken, verifyToken }