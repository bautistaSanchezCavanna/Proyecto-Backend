import mongoose from 'mongoose';
const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name:{type:String},
    age:{type:String},
    email:{type:String, unique: true},
    role:{type:String, enum:["USER", "ADMIN"], default:"USER"},
    password:{type:String},
    cart:{type: mongoose.Schema.Types.ObjectId, ref: 'carts'},
    githubLogin:{type:String},
    lastConnection: {type: Date, default: null}
})

export const userModel = mongoose.model(usersCollection, userSchema);
