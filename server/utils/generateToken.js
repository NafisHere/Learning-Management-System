import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  // Use secure, cross-site compatible cookies in production
  const cookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  if (process.env.NODE_ENV === "production" || process.env.FRONTEND_URL) {
    cookieOptions.sameSite = "none"; // allow cross-site cookies
    cookieOptions.secure = true; // require HTTPS
  } else {
    cookieOptions.sameSite = "lax";
  }

  return res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    user,
  });
};
