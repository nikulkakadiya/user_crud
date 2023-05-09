const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const getUser = await User.findOne({ _id: req.params.id });
    if (!getUser)
        return next(new AppError("User is not define...Please create User", 404));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "User deleted successfully",
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const getUser = await User.findOne({ _id: req.params.id });
    if (!getUser)
        return next(new AppError("User is not define...Please create User", 404));

    const updatedData = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        message: "User update successfully",
    });
});

exports.userProfile = catchAsync(async (req, res, next) => {
    const {name,email,role}=req.user;
    res.status(200).json({
        name,
        email,
        role
    });
})
