<<<<<<< HEAD
export default auth = async (req, res, next) => {
    if (await req.session?.isAdmin) {
      next();
    }
    else {
      res.clearCookie('session1')
      console.log('Unauthorized');
      await res.redirect('/login');
    }
  };
=======
export default auth = async (req, res, next) => {
    if (await req.session?.isAdmin) {
      next();
    }
    else {
      res.clearCookie('session1')
      console.log('Unauthorized');
      await res.redirect('/login');
    }
  };
>>>>>>> origin/main
  //no lo uso