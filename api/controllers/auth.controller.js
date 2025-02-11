const User = require("../models/user.model.js");
const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(422).json({ error: "All fields are required" });
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format!" });
    }

    if (username.length < 4 || password.length < 5) {
        return res.status(400).json({ error: "Username or password length is shorter" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: `User already existed with the email ${existingUser}` });
    }

    const hashedPassword = hashSync(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000 * 24, // for one day 
    });

    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "All fields are required!" });
        }

        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format!" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const authUser = compareSync(password, user.password);

        if (!authUser) {
            return res.status(401).json({ error: "Invalid password" })
        }

        const payload = {
            userId: user._id,
            username: user.username
        }

        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log(token);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000 * 24
          });


        return res.status(200).json({ message: "User logged in successful", token });

    } catch (error) {
        next(error);
    }

}
