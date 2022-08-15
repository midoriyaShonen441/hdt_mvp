const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const getToken = req.headers['access-token']
    // console.log("mid ware ===>", getToken)

    if(!getToken){
        res.sendStatus(401)
    }else{
        try{

            const decode = jwt.verify(getToken, process.env.TOKEN_KEY)
            const replyText = {
                loginStatus: true,
                decode: decode,
                token: getToken
            }
            // console.log("mid ware success ===>",replyText)
            // next();
            // res.status(200).send(replyText)
            // return
        }catch(err){
            console.log(`error in auth: ${err}`)
            res.sendStatus(401)
        }
    }
    return next();
}

module.exports = verifyToken;