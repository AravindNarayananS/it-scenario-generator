"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import scenarioRoutes from './routes/scenarioRoutes';
const scenarioRoutes_1 = __importDefault(require("./Routes/scenarioRoutes"));
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
});
// API routes
app.use('/api', scenarioRoutes_1.default);
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
