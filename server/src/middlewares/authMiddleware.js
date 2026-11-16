import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Check Authorization header (Bearer <token>) for cross-domain requests (Vercel -> Render)
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please log in to continue.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid session token. Please log in again.",
      });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message || error);
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
    });
  }
};

export default authMiddleware;
