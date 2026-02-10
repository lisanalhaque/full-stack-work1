const express = require('express');
const cors = require('cors');
const authRoute = require("./Routes/authRoute");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}));

app.use(express.json());

app.use("/auth", authRoute);

app.listen(8000, () => console.log("listening on port 8000"));