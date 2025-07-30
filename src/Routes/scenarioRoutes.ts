import { Router } from "express";
import { generateScenarioController } from "../Controllers/scenarioController";

const router = Router();
router.post("/generate-scenario", generateScenarioController);
export default router;
