const express = require("express");
const productController = require("../controller/product.js");
const productRouter = express.Router();


// API - Endpoints -Routes
productRouter.post("/" ,productController.createProduct )
.get('/',productController.getAllProducts)
.get('/:id',productController.getOneProduct)
.put("/:id" , productController.replaceProduct)
.patch("/:id" ,productController.updateProduct )
.delete("/:id" , productController.deleteProduct) 

exports.router = productRouter