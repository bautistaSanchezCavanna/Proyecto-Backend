const { Router } = require("express");
const { loginController, registerController, logoutController } = require("../../controllers/session.controler");
const router = Router();

const sessionsProcess = async ()=>{
try {
    
    router.post('/login', loginController);

    router.post('/register', registerController);

    router.get('/logout', logoutController);

} catch (error) {
    throw new Error(error.message);
}
}

sessionsProcess();

module.exports = router;