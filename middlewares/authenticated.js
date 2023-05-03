const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            auth: false,
            message: "No token provided",
        });
    }

    const decoded = jwt.verify(token, secret);
    
    req.userId = decoded.data[0]._id;
    req.user = decoded.data[0];

    next();
}

module.exports = verifyToken;