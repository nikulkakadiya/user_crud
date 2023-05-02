const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: "String",
            require: [true, 'Enter subject name']
        },
        courseName: {
            type: "String",
            require: [true, 'Enter course name']
        }
    },
    {
        timestamps: true
    }
)

const Subject = mongoose.model("Subject", subjectSchema);

module.exports=Subject;