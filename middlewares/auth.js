const auth = async (req, res, next) => {
    if (await req.session.user) {
      next();
    }
    else {
      res.redirect('/accessDenied');
    }
  };
  
  module.exports = auth;