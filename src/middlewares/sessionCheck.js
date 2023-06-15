<<<<<<< HEAD
const sessionMiddleware = async (req, res, next) => {
    const user = await req.session.user;
    if (user) {
      res.redirect('/products');
    } else {
      next();
    }
  };
  
  export default {
    sessionMiddleware
  }
=======
const sessionMiddleware = async (req, res, next) => {
    const user = await req.session.user;
    if (user) {
      res.redirect('/products');
    } else {
      next();
    }
  };
  
  export default {
    sessionMiddleware
  }
>>>>>>> origin/main
  //no lo uso