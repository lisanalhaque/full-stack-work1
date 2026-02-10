const { Router } = require("express");
const authController = require("../controllers/auth.controllers");

const authRoute = Router();

authRoute.get("/create-token", authController.createToken);

module.exports = authRoute;