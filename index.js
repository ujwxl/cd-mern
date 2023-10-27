require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {Schema} = require("mongoose")
const path = require("path");
const cors= require("cors");
const server = express();
const productRouter = require('./routes/products');
const usersRouter = require('./routes/users');
// console.log("productRouter:" , router);
// console.log("userRouter:" , usersRouter.router);


// bodyParser
server.use(express.json());

// CONNECT to Mongoose
main().catch((err)=> console.log(err , "ERROR"))

async function main (){

//  await mongoose.connect('mongodb+srv://ujwalkumar1:Ujwal12@cluster0.fd65aqc.mongodb.net/ecommerceDatabase')
//  console.log("Database connected");
 await mongoose.connect(`${process.env.MONGODB_URI}`)
 console.log("Database connected",`${process.env.MONGODB_URI}`);
//  console.log("process.env.MONGO_URL" ,process.env.MONGO_URL);

//  mongodb+srv://<username>:<password>@cluster0.fd65aqc.mongodb.net/?retryWrites=true&w=majority
}



server.use(cors());
server.use(morgan("dev"))
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
console.log(path.resolve(__dirname,process.env.PUBLIC_DIR) , "ssssssssssss");
server.use('/products' , productRouter.router)
server.use('/user' , usersRouter.router)
server.use("*" , (req, res) => {
  res.sendFile(path.resolve(__dirname , 'build' , 'index.html'))
})



server.listen(process.env.PORT , () => {
  console.log("listening on " + process.env.PORT);
})