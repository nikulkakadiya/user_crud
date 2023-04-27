const AppError = require("../utils/appError");

exports.createUserMiddlewa = async (req, res, next) => {
  if (!req.body.name) return next(new AppError(`Pleas enter name`, 400));
  if (!req.body.email) return next(new AppError(`Pleas enter email`, 400));
  const check = req.body.password === req.body.passwordConfirm;
  if (!check) return next(new AppError(`Password is not compare`, 400));
  next();
};
