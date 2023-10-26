const fs = require("fs");

// const indexHTML = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

// POST
exports.createProduct = (req, res) => {
//   console.log(req.body);
  users.push(req.body);
  res.status(201).json(req.body);
};
// GET
exports.getAllProducts = (req, res) => {
  res.json(users);
};

// GET
exports.getOneProduct = (req, res) => {
  const id = +req.params.id;
  let productById = users.find((p) => p.id === id);
  res.json(productById);
};

// PATCH
exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.findIndex((pro) => pro.id === id);
  const product = users[id - 1];
  users.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
};

// PUT
exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.findIndex((pro) => pro.id === id);
  users.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

// DELETE
exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.find((product) => product.id === id);
  const product = users[productIndex];
  users.splice(productIndex, 1);
  res.status(201).json(product);
};
