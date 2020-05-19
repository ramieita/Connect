
function verifytoken(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]; //[0]= 'Bearer' [1] = token 
       
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = verifytoken;
