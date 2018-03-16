const jwt = require("jsonwebtoken");
const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";

module.exports = function(req,res,next) {
    if (req.url=="/login" && req.method=="POST") {
        if (req.body!=null && req.body.username==USERNAME && req.body.password==PASSWORD) {
            let token = jwt.sign({
                data: USERNAME,
                expiresIn: "1h"
            },APP_SECRET);
            res.json(
                {
                    success:true,
                    token:token,
                    displayName: "Hieu Tran",
                    winMatch: 3,
                    totalMatch: 12
                }
            );
        } else {
            res.json({success:false});
        }
        res.end();
        return;
    } else if (req.url.startsWith("/engine")) {
        let token = req.headers["authorization"];
        if ((token!=null) && token.startsWith("Bearer<")) {
            token=token.substring(7,token.length-1);
            try {
                jwt.verify(token,APP_SECRET);
                res.json({
                    success:true,
                    nextMove:13
                });
                res.end();
                return;
            } catch (err) {

            }
        }
        res.statusCode=401;    
        res.end();
        return;
    }
    next(); 
}