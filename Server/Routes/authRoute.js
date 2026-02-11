const { Router } = require("express");
const authController = require("../controllers/auth.controllers");

const authRoute = Router();

authRoute.get("/create-token", authController.createToken);
authRoute.get("/verify-token", authController.verifyToken);

module.exports = authRoute;