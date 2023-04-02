const User = require("../models/userModel");
const errorHandeler = require("../utils/errorHandeler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandeler");
const sendToken = require("../utils/jwtToken");

//register users
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  //console.log(req.body);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this adderss exp",
      url: "this url exp",
    },
  });
  const token = user.getJWTToken();

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();

  sendToken(user, 200, res);
});

exports.check = catchAsyncErrors((req, res, next) => {
  res.status(201).json({
    success: true,
  });
});

//logout user
exports.logoutUser = catchAsyncErrors((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
