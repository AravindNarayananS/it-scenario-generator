import { challenges, incidents, troubleshootingSteps} from "../Data/scenarioData";

//Interface for the inputs to the scenario generator.
export interface ScenarioInputs {
  technology: string;
  role: string;
  environment: string;
}

//Interface for the generated IT solution.
export interface GeneratedScenario {
  challenge: string;
  incident: string;
  troubleshootingStep: string;
}

//Interface for the complete response from the scenario generator.
export interface ScenarioResponse {
  originalInputs: ScenarioInputs;
  scenario: GeneratedScenario;
}

// Generates a random IT solution based on predefined datasets.
export const generateScenario = (inputs: ScenarioInputs): ScenarioResponse => {
  const randomChallenge =
    challenges[Math.floor(Math.random() * challenges.length)];
  const randomIncident =
    incidents[Math.floor(Math.random() * incidents.length)];
  const randomTroubleshootingStep =
    troubleshootingSteps[
      Math.floor(Math.random() * troubleshootingSteps.length)
    ];

  return {
    originalInputs: inputs,
    scenario: {
      challenge: randomChallenge,
      incident: randomIncident,
      troubleshootingStep: randomTroubleshootingStep,
    },
  };
};
