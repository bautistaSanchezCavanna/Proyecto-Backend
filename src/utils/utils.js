const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/constants');


const hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (userDB, password)=> bcrypt.compareSync(password, userDB.password);

const generateToken = (user) =>{
    const token = jwt.sign({...user}, SECRET_KEY, {expiresIn: '10m'});
    return token;
}

const cookieExtractor = (req)=>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['cookieToken'];
        return token;
    }
}


module.exports = {hashPassword, isValidPassword, generateToken, cookieExtractor};