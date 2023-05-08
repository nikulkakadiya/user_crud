const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// =========================== Registration =================================

exports.registration = catchAsync(async (req, res, next) => {
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
        return next(new AppError(`${req.body.email} Email is all ready exist`));
    }
    const newUser = await User.create(req.body);
    // const token = signToken(newUser._id);

    res.status(201).json({
        status: "success",
        message: "Register success Fully",
    });
});

// =========================== Login =================================

exports.login = catchAsync(async (req, res, next) => {
    const { email, password,role } = req.body;

    // 1) Check email and password exists

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    if(!role){
        return next(new AppError("Please check your role", 400));
    }

    // 2) Check is user exists and password is correct

    const user = await User.findOne({ email,role }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email and password", 401));
    }

    // 3) if everything is ok, send token to client
    const token = signToken(user._id);
    // console.log(token);
    return res.status(200).json({
        status: "success",
        message: "Login success Fully",
        token,
        email: user.email,
        role: user.role,
    });
});

// =========================== Protect =================================

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("You are not Logged-In ! Please Log-In to get access", 401)
        );
    }
    // 2) Varification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // 3) Check if user still exists

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(
            new AppError("The user belongs to this token does no longer", 401)
        );
    }

    req.user = freshUser;
    next();
});

// =========================== RestrictTo =================================

exports.restrictTo = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }
        next();
    };
};
