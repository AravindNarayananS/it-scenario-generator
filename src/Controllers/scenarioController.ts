
import { Request, Response } from 'express';
import { generateScenario, ScenarioInputs } from '../Services/scenarioGenerator';

//Handles the request to generate an IT scenario.

export const generateScenarioController = (req: Request, res: Response): void => {
  const { technology, role, environment } = req.body;

  // Validate inputs
  if (!technology || !role || !environment) {
    res.status(400).json({
      error: 'Missing required parameters: technology, role, and environment are all required.',
    });
    return;
  }

  const inputs: ScenarioInputs = { technology, role, environment };
  const scenarioResponse = generateScenario(inputs);

  res.status(200).json(scenarioResponse);
};