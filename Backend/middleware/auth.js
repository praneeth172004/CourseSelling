const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                msg: "Token is not generated. Access Denied."
            });
        }

        const response = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!response || !response.id) {
            return res.status(401).json({
                msg: "Invalid Token. Unauthorized Access."
            });
        }

        req.userid = response.id;  
        next(); 

    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
}

module.exports = auth;
