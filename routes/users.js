const express = require("express");
const usersController = require("../controller/user");
const usersRouter = express.Router();

// console.log(usersRouter);
// console.log("usersController" ,usersController.getAllProducts);
// console.log("usersController" ,usersController);

// API - Endpoints -Routes
usersRouter
  .get("/", usersController.getAllProducts)
  .get("/:id", usersController.getOneProduct)
  .post("/", usersController.createProduct)
  .put("/:id", usersController.replaceProduct)
  .patch("/:id", usersController.updateProduct)
  .delete("/:id", usersController.deleteProduct);

exports.router = usersRouter;
