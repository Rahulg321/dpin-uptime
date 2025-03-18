import type { NextFunction, Request, Response, RequestHandler } from "express"; // Import RequestHandler
import { JWT_PUBLIC_KEY } from "./config";

import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY) as { sub?: string }; // Type the decoded object

    console.log("Decoded", decoded);

    if (!decoded || !decoded.sub) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    req.userId = decoded.sub;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ error: "Unauthorized" }); // Handle potential JWT verification errors
  }
};
