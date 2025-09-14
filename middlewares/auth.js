import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
