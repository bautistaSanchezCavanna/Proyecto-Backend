import mongoose from 'mongoose';
const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name:{type:String},
    age:{type:String},
    email:{type:String, unique: true},
    role:{type:String},
    password:{type:String},
    githubLogin:{type:String, unique: true}
})

export const userModel = mongoose.model(usersCollection, userSchema);
