const mongoose = require('mongoose');
const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name:{type:String},
    age:{type:String},
    email:{type:String, unique: true},
    password:{type:String}
})

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;