import express, { Application, Request, Response, NextFunction } from "express";
import scenarioRoutes from "./Routes/scenarioRoutes";

const app: Application = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("API is healthy");
});

// API routes
app.use("/api", scenarioRoutes);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
