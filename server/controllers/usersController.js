const User = require("../models/User");

exports.usersController = {
    async getUsers(req, res) {
        const users = await User.find({});
        res.json(users);
    }
   };