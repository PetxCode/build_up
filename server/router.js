const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const userModel = require("./userModel");
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const getUsers = await userModel.find();

    res.status(200).json({
      message: "Users found",
      totalUsers: getUsers.length,
      data: getUsers,
    });
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id, req.body);

    res.status(200).json({
      message: "User found",
      totalUsers: getUser.length,
      data: getUser,
    });
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/register", upload, async (req, res) => {
  const { userName, email, password } = req.body;

  const saltPassword = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, saltPassword);

  try {
    const createUser = await userModel.create({
      userName,
      email,
      password: hashPassword,
      avatar: req.file.path,
    });
    res.status(200).json({
      message: "User created",
      data: createUser,
    });
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (checkPassword) {
        const { password, ...info } = user._doc;

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.userName,
            isAdmin: user.isAdmin,
          },
          "BUkkYisMyBEAUtyWIfEEEE",
          { expiresIn: "1d" }
        );
        res.status(200).json({
          message: `Welcome back ${user.userName}`,
          data: { ...info, token },
        });
      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

const verified = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (authToken) {
      const token = authToken.split(" ")[2];

      jwt.verify(token, "BUkkYisMyBEAUtyWIfEEEE", (error, payload) => {
        if (error) {
          res.status(400).json({ message: "Please check your Token again!" });
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      res.status(400).json({ message: "something is wrong with this TOKEN" });
    }
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
};

router.patch("/user/:id", verified, async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          userName: req.body.userName,
        },
        { new: true }
      );
      res.status(200).json({
        message: `user Updated`,
        data: user,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

router.delete("/user/:id", verified, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await userModel.findByIdAndRemove(req.params.id, req.body);
      res.status(200).json({
        message: `user deleted`,
      });
    } else {
      res
        .status(400)
        .json({ message: "you are not an Admin User, so you can't do this!" });
    }
  } catch (err) {
    res.status(400).json({ message: "you don't have right to this operation" });
  }
});

module.exports = router;
