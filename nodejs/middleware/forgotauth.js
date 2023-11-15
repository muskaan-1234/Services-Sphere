const webtoken = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized: Missing token" });
  }

  const ary = token.split(" ");

  if (ary.length !== 2 || ary[0] !== 'Bearer') {
    return res.status(401).json({ status: false, message:"Unauthorized: Invalid token format" });
  }

  try 
  {
    const decodedToken = webtoken.verify(ary[1], process.env.sec_key);
    console.log("Token verified")
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
  }
};
