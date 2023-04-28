const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");


mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log("DB Connection successfully :"))
    .catch((err) => {
        console.error("Connection Error : " + err);
    });


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server port number is ${PORT}`);
});
