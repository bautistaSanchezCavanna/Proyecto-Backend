const userModel  = require("../daos/models/users.model");

const loginController = async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        console.log("User not found, you must sign up to create one.");
    }else{
        if(password !== user.password){
            console.log('Wrong user or password');
        }else{
        req.session.user = user;
        req.session.save(err=>{
            if(err)console.log('Session error ', err);
        })
        res.redirect('/products');
    }

    }
}

const registerController = async (req, res)=>{
    const {email} = req.body;
    const userExists = await userModel.findOne({email});
    if(userExists){
        console.log('User already exists, Log in.');
    }
    const newUser = await userModel.create(req.body);
    req.session.user = newUser;
    req.session.save(err=>{
        if(err)console.log('Session error ', err);
    })
    res.redirect('/products');

}

const logoutController = async (req, res, next)=>{
    req.session.destroy(error=>{
        if(error) {
            console.log(error);
        }else{
            res.clearCookie('session1');
        }
    })
}

module.exports = {loginController, registerController, logoutController};