const bcrypt = require('bcrypt');
const user_model = require('../models/user.models');

exports.create_user = async (req,res,next) => {
    try{
    var { email, password } = req.body;
    const username = email.split('@')[0];
    password = await bcrypt.hash(password,10);
    const user = new user_model.User({ username, email, password });
    await user.save();
    res.status(200).json(user);
    }catch(err){
        res.status(500).json({'message':'Cant Create User'})
    }
    next()
}

exports.get_user = async (req,res,next) => {
    try{
    const email = req.email
    const user = await user_model.User.findOne({email:email},"username email");
    res.status(200).json(user);
    }catch(err){
        res.status(404).json({'message':'User Not Found'})
    }
    next();
}