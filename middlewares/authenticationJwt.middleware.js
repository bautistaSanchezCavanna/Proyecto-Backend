const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../src/constants/constants');

/* const authToken = (req, res, next)=>{
const authHeader = req.headers.authorization;
if(!authHeader){
    return res.status(401).json({error: 'Not authenticated'});
}
const token = authHeader.split(" ")[1];
jwt.verify(token, SECRET_KEY, (error, credentials)=>{
    if(error){
        return res.status(403).json({error:'Not authorized'});
    }
    req.user = credentials;
    next();
})
} */
 const authToken = (req, res, next)=>{
    const token = req.cookies['cookieToken'];
    if(!token){
        return res.status(401).json({error: 'Not authenticated'});
    }
    jwt.verify(token, SECRET_KEY, (error, credentials)=>{
        if(error){
            return res.status(403).json({error:'Not authorized'});
        }
        req.user = credentials;
        next();
    })
    } 

module.exports = authToken;