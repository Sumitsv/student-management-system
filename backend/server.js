const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables from the backend folder regardless of where the app starts.
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to Database
connectDB();

const app = express();

// Middleware: CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy rejection: Origin not allowed."));
    },
    credentials: true,
  }),
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck Route
app.get("/", (req, res) => {
  res.send("Student Management System API is running...");
});

// API Routes
app.use("/api/students", studentRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV || "development"} mode on port ${port}`,
    );
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(
        `Port ${port} is already in use. Retrying on port ${nextPort}...`,
      );
      startServer(nextPort);
      return;
    }

    console.error("Server failed to start:", error.message);
    process.exit(1);
  });
};

startServer(PORT);
