import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.json({
        message: "Token missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      req.user = decodedToken;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
