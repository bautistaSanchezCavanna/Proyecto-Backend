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
  //no lo uso