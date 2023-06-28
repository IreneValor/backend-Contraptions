const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const User = require("./../models/User.model");
const { isAuthenticated } = require("../middlewares/Token.middleware");
const User = require("../models/User.Model");
const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, username } = req.body;
  //conprobar los datos, longuitud , campos rellenos...
  if (password.length < 2) {
    // o if(email ===''||password ===''||name==='')
    res
      .status(400)
      .json({ message: "Password must have at least 2 characters" }); //message: "provide email, password and name"
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, username });
    })
    .then((createdUser) => {
      const { email, username, _id } = createdUser;
      const user = { email, username, _id };

      res.status(201).json({ user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      if (bcrypt.compareSync(password, foundUser.password)) {
        const { _id, email, username } = foundUser;

        const payload = { _id, email, username };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // req.session.currentUser = foundUser;

        res.json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("Authenticated user data: ", req.payload);

  res.status(200).json(req.payload);
});

module.exports = router;
