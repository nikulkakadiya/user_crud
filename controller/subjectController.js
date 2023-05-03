const Subject = require("../models/subjectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createSubject = catchAsync(async (req, res, next) => {
    await Subject.create(req.body);
    res.status(201).json({
        status: "success",
        message: "Add success Fully",
    });
})

exports.getAllSubject = catchAsync(async (req, res, next) => {
    const result = await Subject.find({}, { _id: 1, name: 1, courseName: 1 });
    res.status(201).json({
        status: "success",
        result
    });
})

exports.updateSubject = catchAsync(async (req, res, next) => {
    await Subject.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        message: "update success Fully",
    });
})

exports.deleteSubject = catchAsync(async (req, res, next) => {
    await Subject.findByIdAndDelete(req.params.id);
    res.status(201).json({
        status: "success",
        message: "delete success Fully",
    });
})

exports.findSubjectById = catchAsync(async (req, res, next) => {
   const data=await Subject.findById(req.params.id,{_id:1,name:1,courseName:1});
   res.status(201).json({
    status: "success",
    data
});
})