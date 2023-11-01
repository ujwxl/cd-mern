const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const model = require("../model/user");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

const User = model.User;

exports.signUp = async (req, res) => {
  console.log(req.body.email);
  console.log(process.env.SECRET);
  const user = new User(req.body);

  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = hash;

  user
    .save()
    .then((doc) => {
      console.log(doc, "Doc");
      return res.status(201).json({token});
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
  const isAuth = bcrypt.compareSync(req.body.password, doc.password);
if(isAuth) {
    const token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
        doc
    .save()
    .then((doc) => {
      console.log(doc, "Doc");
      return res.status(201).json(doc);
    })
      res.json(token);
} else{
    res.sendStatus(401)
}
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }

 

//   user
//     .save()
//     .then((doc) => {
//       console.log(doc, "Doc");
//       return res.status(201).json(doc);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
};
