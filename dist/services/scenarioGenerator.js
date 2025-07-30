"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScenario = void 0;
// src/services/scenarioGenerator.ts
const scenarioData_1 = require("../data/scenarioData");
/**
 * Generates a random IT scenario based on predefined datasets.
 * @param inputs - The technology, role, and environment provided by the user.
 * @returns A structured object containing the original inputs and a randomly generated scenario.
 */
const generateScenario = (inputs) => {
    const randomChallenge = scenarioData_1.challenges[Math.floor(Math.random() * scenarioData_1.challenges.length)];
    const randomIncident = scenarioData_1.incidents[Math.floor(Math.random() * scenarioData_1.incidents.length)];
    const randomTroubleshootingStep = scenarioData_1.troubleshootingSteps[Math.floor(Math.random() * scenarioData_1.troubleshootingSteps.length)];
    return {
        originalInputs: inputs,
        scenario: {
            challenge: randomChallenge,
            incident: randomIncident,
            troubleshootingStep: randomTroubleshootingStep,
        },
    };
};
exports.generateScenario = generateScenario;
