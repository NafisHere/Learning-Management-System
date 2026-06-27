import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import reviewRoute from "./routes/review.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

// Normalize frontend URL (remove trailing slash) to avoid origin mismatch
const normalizedFrontendUrl = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.replace(/\/+$/, "")
    : undefined;

const allowedOrigins = [
    normalizedFrontendUrl,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin like server-to-server or curl
            if (!origin) return callback(null, true);

            // allow if origin exactly matches one of the allowed origins
            if (allowedOrigins.includes(origin)) return callback(null, true);

            // otherwise block
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
//Farhan: endpoint to review
app.use("/api/v1/review", reviewRoute);
 
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})


