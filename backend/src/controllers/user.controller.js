const bcrypt = require('bcrypt');
const user_model = require('../models/user.models');

const create_user = async (req,res,next) => {
    var { username, email, password } = req.body;
    password = await bcrypt.hash(password,10);
    console.log(password);
    const user = new user_model.User({ username, email, password });
    await user.save();
    res.status(200).json(user);
    next()
}

module.exports = {
    create_user:create_user
}