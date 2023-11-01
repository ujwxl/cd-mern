const express = require("express");
const usersController = require("../controller/user");
const usersRouter = express.Router();

// console.log(usersRouter);
// console.log("usersController" ,usersController.getAllUsers);
// console.log("usersController" ,usersController);

// API - Endpoints -Routes
usersRouter
  .get("/", usersController.getAllUsers)
  .get("/:id", usersController.getOneUser)
  .put("/:id", usersController.replaceUser)
  .patch("/:id", usersController.updateUser)
  .delete("/:id", usersController.deleteUser);

exports.router = usersRouter;
