const jwt = require("jsonwebtoken")  // Import the jsonwebtoken library to create and verify JWTs

const createToken = async (req, res) => {
    try{
        const token = jwt.sign({sub:"testing"},"jgrskygchljc",{expiresIn: "1h"}) // Create a JWT with a payload, secret key, and expiration time
        res.status(200).json({message: "Token created successfully", token: token})
    }catch(err){
        return res.status(500).json({message: "Error creating token", error: err})
    }
}

module.exports = {createToken}