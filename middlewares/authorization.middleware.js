const authorization = (role)=>{
    return async(req, res, next)=>{
        if(!req.user){
            return res.status(401).json({error:'Not authenticated'});
        } 
        if(req.user?.role !== role){
            return res.status(403).json({error: 'Access denied'});
        }
        next();
    }
}

module.exports = authorization;