import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(`token= ${token}`);
  if (token) {
    const onlyToken = token.slice(6, token.length);
    // console.log(`Onlytoken= ${onlyToken}`);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ msg: "Invalid Token" });
      }
      console.log("decode=" + decode.isAdmin);
      req.user = decode; // เก็บข้อมูลพวก id name ที่ป้อนเข้าไปตอนสร้าง token
      // next();
      // return;
    });
    next();
  } else {
    return res.status(401).send({ msg: "Token is not supplied" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid" });
};

export { getToken, isAuth, isAdmin };
