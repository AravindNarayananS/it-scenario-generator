"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
// Try a different port to rule out conflicts, e.g., 3001
const PORT = process.env.PORT || 3001; // Changed to 3001 for troubleshooting
try {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('API documentation:');
        console.log('  POST /api/generate-scenario - Generates a random IT scenario.');
        console.log('  Request Body Example:');
        console.log('  {');
        console.log('    "technology": "Cloud Computing",');
        console.log('    "role": "System Administrator",');
        console.log('    "environment": "Cloud Infrastructure"');
        console.log('  }');
        console.log('  GET /health - Health check endpoint.');
    }).on('error', (err) => {
        // Catch specific errors if the server fails to start listening
        console.error(`Server failed to start on port ${PORT}:`, err.message);
        // You might want to exit the process here if the error is fatal
        process.exit(1);
    });
}
catch (error) {
    // Catch any synchronous errors that might occur before app.listen is fully set up
    console.error('An unexpected error occurred during server startup:', error.message);
    process.exit(1);
}
// Catch unhandled promise rejections (for async errors not caught by try-catch)
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, cleanup, or crash reporting here
    process.exit(1); // Exit the process to indicate a critical error
});
// Catch uncaught exceptions (for synchronous errors not caught by try-catch)
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    // Application specific logging, cleanup, or crash reporting here
    process.exit(1); // Exit the process to indicate a critical error
});
