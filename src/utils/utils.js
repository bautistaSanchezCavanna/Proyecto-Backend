import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import pkg from 'jsonwebtoken';
import EnvConfig from '../config/.env.config.js';
const { sign } = pkg;

export const hashPassword = (password)=> hashSync(password, genSaltSync(10));

export const isValidPassword = (userDB, password)=> compareSync(password, userDB.password);

export const generateToken = (user) =>{
    const token = sign({...user}, EnvConfig.SECRET_KEY, {expiresIn: '10m'});
    return token;
}

export const cookieExtractor = (req)=>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies[EnvConfig.SESSION_KEY];
        return token;
    }
}
