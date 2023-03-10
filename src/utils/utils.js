const bcrypt = require('bcrypt');

const hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (userDB, password)=> bcrypt.compareSync(password, userDB.password);

module.exports = {hashPassword, isValidPassword};