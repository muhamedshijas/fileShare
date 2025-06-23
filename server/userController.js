import User from "./models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ userName: name }).lean();
  if (existingUser) {
    return res.json({ success: false, message: "UserName  Already Exist " });
  }
  const emailExist = await User.findOne({ email: email }).lean();
  if (emailExist) {
    return res.json({ success: false, message: "Email Already Exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName: name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "User created successfully" });
}

export async function login(req, res) {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName }).lean();
  console.log(user);
  if (!user) {
    return res.json({ success: false, message: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid password" });
  }

  // Success response
  const token = jwt.sign({ user: true, id: user._id }, process.env.JWT_SECRET);

  return res
    .cookie("usertoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
    })
    .json({ success: true });
}

export async function checkAuth(req, res) {
  console.log("hiii");

  const token = req.cookies.usertoken;
  if (!token) return res.json({ loggedIn: false });

  const verifiedJwt = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne(
    { _id: verifiedJwt.id },
    { password: 0 }
  ).lean();

  if (!user) return res.json({ loggedIn: false });

  return res.json({ loggedIn: true, user });
}
export async function logout(req,res){
  res.cookie("usertoken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  }).json({ message: "logged out", error: false });
  console.log("logged in");
}
