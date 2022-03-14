const jwt = require('jsonwebtoken');
const {User} = require('../model/user')

//middleware to ensure user is logged in and have a token before allowed access to certain endpoints
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send('You are not logged in');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.send('You are not logged in');
    }
}



module.exports = { requireAuth };