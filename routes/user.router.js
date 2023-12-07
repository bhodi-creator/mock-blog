const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel}=require('../model/user.model')


const UserRouter = express.Router();

UserRouter.get("/", async(req,res)=>{
try {
        const user=await UserModel.find()
        res.status(200).send({user})
} catch (error) {
    res.status(400).send({err})
}
})

UserRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ "msg": "User registered successfully" });
  } catch (err) {
    res.status(500).send({ "error": err.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (!user) {
      return res.status(401).send({ "msg": "User not found" });
    }
     bcrypt.compare(password, user.password,async(err,result)=>{
        if (result) {
            const token = jwt.sign({ userId: user._id, username: user.username }, "masai");
            res.status(200).send({ "msg": "Login successful",token });
          } else {
            res.status(401).send({ "msg": "Incorrect credentials" });
          }
    });
   
  } catch (err) {
    res.status(500).send({ "msg": err.message });
  }
});

module.exports = {
    UserRouter
}
