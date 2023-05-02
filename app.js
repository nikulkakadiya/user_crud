const express = require("express");
const userRoute = require("./routs/userRoute");
const subjectRoute = require("./routs/subjectRouter");
const globleErrorhandler = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/subject", subjectRoute);

app.get("/demo", (req, res) => {
    res.send("this demo is done :");
});

app.use(globleErrorhandler);
app.all("*", (req, res, next) => {
    // console.log('okk');
    const err = new Error(`Not Found ${req.originalUrl} on this server`);

    res.status(400).json({
        message: err.message,
    });
});

module.exports = app;
