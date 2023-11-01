require('dotenv').config()
const fs = require('fs');
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const {Schema} = require("mongoose")
const path = require("path");
const cors= require("cors");
const jwt = require("jsonwebtoken");

const productRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
// console.log("productRouter:" , router);
// console.log("userRouter:" , usersRouter.router);


const server = express();

// bodyParser
server.use(express.json());
// server.use(express.urlencoded());

// CONNECT to Mongoose
main().catch((err)=> console.log(err , "ERROR"))

async function main (){



//  await mongoose.connect('mongodb+srv://ujwalkumar1:Ujwal12@cluster0.fd65aqc.mongodb.net/ecommerceDatabase')
//  console.log("Database connected");
 await mongoose.connect(process.env.MONGODB_URI)
 console.log("Database connected", process.env.MONGODB_URI);
//  console.log("process.env.MONGO_URL" ,process.env.MONGO_URL);
// mongodb+srv://vercel-admin-user:TgUJROi0AMks9bEv@cluster0.fd65aqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// mongodb+srv://vercel-admin-user:TgUJROi0AMks9bEv@cluster0.fd65aqc.mongodb.net/ecommerceDatabase?retryWrites=true&w=majority

//  mongodb+srv://<username>:<password>@cluster0.fd65aqc.mongodb.net/?retryWrites=true&w=majority
}

const publicKey = fs.readFileSync( path.resolve(__dirname,'public.key') , 'utf-8');

// Middleware for JWT authentication
const auth = (req, res, next) => {
  // console.log(jwt);
  
  try {
    const token = req.get('Authorization').split('Bearer ')[1];
    console.log(token)
    var decoded = jwt.verify(token, publicKey)
    console.log("decoded" , decoded);
   
    if(decoded.email){
      console.log("tried");
     next()
    }else{
     res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(401)
  }
  console.log("decoded2" , decoded);
}



server.use(cors());
server.use(morgan("dev"))
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
console.log(path.resolve(__dirname,process.env.PUBLIC_DIR) , "ssssssssssss");
server.use('/auth' , authRouter.router)
server.use('/products', auth, productRouter.router)
server.use('/users', auth, usersRouter.router)
server.use("*" , (req, res) => {
  res.sendFile(path.resolve(__dirname , 'build' , 'index.html'))
})



server.listen(process.env.PORT , () => {
  console.log("listening on " + process.env.PORT);
})