"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/scenarioRoutes.ts
const express_1 = require("express");
const scenarioController_1 = require("../controllers/scenarioController");
const router = (0, express_1.Router)();
/**
 * POST /api/generate-scenario
 * Generates a random IT scenario based on provided inputs.
 * Request Body:
 * {
 * "technology": "Cloud Computing",
 * "role": "System Administrator",
 * "environment": "Cloud Infrastructure"
 * }
 * Response:
 * {
 * "originalInputs": {
 * "technology": "Cloud Computing",
 * "role": "System Administrator",
 * "environment": "Cloud Infrastructure"
 * },
 * "scenario": {
 * "challenge": "Performance bottleneck",
 * "incident": "Service outage detected",
 * "troubleshootingStep": "Check logs for errors and warnings"
 * }
 * }
 */
router.post('/generate-scenario', scenarioController_1.generateScenarioController);
exports.default = router;
