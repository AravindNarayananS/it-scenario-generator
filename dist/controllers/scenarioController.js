"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScenarioController = void 0;
const scenarioGenerator_1 = require("../services/scenarioGenerator");
/**
 * Handles the request to generate an IT scenario.
 * @param req - Express request object.
 * @param res - Express response object.
 */
const generateScenarioController = (req, res) => {
    const { technology, role, environment } = req.body;
    // Validate inputs
    if (!technology || !role || !environment) {
        res.status(400).json({
            error: 'Missing required parameters: technology, role, and environment are all required.',
        });
        return;
    }
    const inputs = { technology, role, environment };
    const scenarioResponse = (0, scenarioGenerator_1.generateScenario)(inputs);
    res.status(200).json(scenarioResponse);
};
exports.generateScenarioController = generateScenarioController;
