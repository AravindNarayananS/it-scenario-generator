import app from "./app";

const PORT = process.env.PORT;

try {
  app
    .listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log("API documentation:");
      console.log(
        "  POST /api/generate-scenario - Generates a random IT scenario."
      );
      console.log("  Request Body Example:");
      console.log("  {");
      console.log('    "technology": "Cloud Computing",');
      console.log('    "role": "System Administrator",');
      console.log('    "environment": "Cloud Infrastructure"');
      console.log("  }");
      console.log("  GET /health - Health check endpoint.");
    })
    .on("error", (err: Error) => {
      // Catch specific errors if the server fails to start listening
      console.error(`Server failed to start on port ${PORT}:`, err.message);
      // Exit the process here if the error is fatal
      process.exit(1);
    });
} catch (error: any) {
  // Catch any synchronous errors
  console.error(
    "An unexpected error occurred during server startup:",
    error.message
  );
  process.exit(1);
}

// Catch unhandled promise rejections (for async errors not caught by try-catch)
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Catch uncaught exceptions (for synchronous errors not caught by try-catch)
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1);
});
