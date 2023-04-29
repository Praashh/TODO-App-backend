import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";


export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(password)
    let user = await User.findOne({ email });
  
   
    if (user) return next(new ErrorHandler("user already exist", 404));
  
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    user = await User.create({ name, email, password: hashedPassword });
  
    setCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const Login = async (req, res, next) => {
  try {
      // console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invailid Email or Password", 400));


  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invailid Email or Password", 404));
  
  setCookie(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
