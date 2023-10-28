const fs = require("fs");
const path = require('path');
const model = require("../model/user");
// const indexHTML = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), "utf-8"));
// const users = data.users;

const User = model.User;

// POST
exports.createUser = async (req, res) => {
//   console.log(req.body);
  const user = new User(req.body)
  user
    .save()
    .then((doc) => {
      console.log(doc, "Doc");
      return res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
// GET
exports.getAllUsers = async (req, res) => {
  const users = new User.find();
  res.status(200).json(users);
};

// GET
exports.getOneUser = (req, res) => {
  const id = +req.params.id;
  const user = new User.findOne(id);
  let UserById = users.find((p) => p.id === id);
  res.json(UserById);
};

// PATCH
exports.updateUser = async (req, res) => {
  const id = +req.params.id;
  // const UserIndex = users.findIndex((pro) => pro.id === id);
  // const User = users[id - 1];
  // users.splice(UserIndex, 1, { ...User, ...req.body });
  // res.status(201).json();


  try {
    const doc = await User.findOneAndUpdate({_id: `${id}`} , req.body, {new: true});
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }
};

// PUT
exports.replaceUser = async (req, res) => {
  const id = +req.params.id;
  // const UserIndex = users.findIndex((pro) => pro.id === id);
  // users.splice(UserIndex, 1, { ...req.body, id: id });
  // res.status(201).json();

  try {
    const doc = await User.findOneAndReplace({_id: `${id}`} , req.body);
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }

};

// DELETE
exports.deleteUser = async (req, res) => {
  const id = +req.params.id;
  // const UserIndex = users.find((User) => User.id === id);
  // const User = users[UserIndex];
  // users.splice(UserIndex, 1);
  // res.status(201).json(User);

  try {
    const doc = await User.findOneAndDelete({_id: `${id}`});
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }

};
