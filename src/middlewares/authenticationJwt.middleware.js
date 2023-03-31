import { verify } from 'jsonwebtoken';
import EnvConfig from '../config/.env.config.js';


 export const authToken = (req, res, next)=>{
    const token = req.cookies[EnvConfig.SESSION_KEY];
    if(!token){
        return res.status(401).json({error: 'Not authenticated'});
    }
    verify(token, EnvConfig.SECRET_KEY, (error, credentials)=>{
        if(error){
            return res.status(403).json({error:'Not authorized'});
        }
        req.user = credentials;
        next();
    })
    } 
//no lo uso