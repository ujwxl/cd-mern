const fs = require("fs");
const model = require("../model/product");
const mongoose = require('mongoose');
const Product = model.Product;

// const indexHTML = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;

// POST
exports.createProduct = (req, res) => {
  // console.log(req.body);
  const product = new Product(req.body);

  product
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
exports.getAllProducts = async (req, res) => {
//  const product = await Product.find();
 let product = [
  {
    "id": 2,
    "title": "iPhone X",
    "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price": 899,
    "discountPercentage": 17.94,
    "rating": 4.44,
    "stock": 34,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
    ]
}
 ]
  res.json(product);
};

// GET
exports.getOneProduct = async (req, res) => {
  const id = req.params.id;
 const product = await Product.findById(id);

  // let productById = products.find((p) => p.id === id);
  res.json(product);
};

// PATCH
exports.updateProduct = async ( req, res) => {
  const id = req.params.id;
    console.log(typeof( id));
  // const productIndex = products.findIndex((pro) => pro.id === id);
  // const product = products[id - 1];
  // products.splice(productIndex, 1, { ...product, ...req.body });

  try {
    const doc = await Product.findOneAndUpdate({_id: `${id}`} , req.body, {new: true});
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }

};

// PUT
exports.replaceProduct = async(req, res) => {
  const id = req.params.id;
  // console.log("idddddddd" , id);
  // const productIndex = products.findIndex((pro) => pro.id === id);
  // products.splice(productIndex, 1, { ...req.body, id: id });

  try {
    const doc = await Product.findOneAndReplace({_id: `${id}`} , req.body);
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }

};

// DELETE
exports.deleteProduct = async(req, res) => {
  const id = req.params.id;
  // const productIndex = products.find((product) => product.id === id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1);
  try {
    const doc = await Product.findOneAndDelete({_id: `${id}`});
    console.log(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).json(err)
  }
  // res.status(201).json(product);
};
