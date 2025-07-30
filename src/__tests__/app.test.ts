import request from "supertest";
import app from "../app";
import * as scenarioGenerator from "../Services/scenarioGenerator";
import { ScenarioInputs } from "../Services/scenarioGenerator";

describe("App and API Integration Tests", () => {
  beforeEach(() => {
    jest
      .spyOn(scenarioGenerator, "generateScenario")
      .mockImplementation((inputs: ScenarioInputs) => {
        return {
          originalInputs: inputs, // Return the inputs that were passed to the mocked function
          scenario: {
            challenge: "Mock Challenge",
            incident: "Mock Incident",
            troubleshootingStep: "Mock Troubleshooting Step",
          },
        };
      });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it("should respond with a 200 status for the health check endpoint", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("API is healthy");
  });

  it("should return a 200 status and a scenario for valid POST request to /api/generate-scenario", async () => {
    const validInputs = {
      technology: "Cloud Computing",
      role: "DevOps Engineer",
      environment: "Cloud Infrastructure",
    };

    const res = await request(app)
      .post("/api/generate-scenario")
      .send(validInputs);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("originalInputs");
    expect(res.body.originalInputs).toEqual(validInputs);
    expect(res.body).toHaveProperty("scenario");
    expect(res.body.scenario).toHaveProperty("challenge");
    expect(res.body.scenario).toHaveProperty("incident");
    expect(res.body.scenario).toHaveProperty("troubleshootingStep");
    expect(scenarioGenerator.generateScenario).toHaveBeenCalledWith(
      validInputs
    );
  });

  it("should return a 400 status for missing technology in POST request", async () => {
    const invalidInputs = {
      role: "DevOps Engineer",
      environment: "Cloud Infrastructure",
    };

    const res = await request(app)
      .post("/api/generate-scenario")
      .send(invalidInputs);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(
      "Missing required parameters: technology, role, and environment are all required."
    );
    expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
  });

  it("should return a 400 status for missing role in POST request", async () => {
    const invalidInputs = {
      technology: "Cloud Computing",
      environment: "Cloud Infrastructure",
    };

    const res = await request(app)
      .post("/api/generate-scenario")
      .send(invalidInputs);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(
      "Missing required parameters: technology, role, and environment are all required."
    );
    expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
  });

  it("should return a 400 status for missing environment in POST request", async () => {
    const invalidInputs = {
      technology: "Cloud Computing",
      role: "System Administrator",
    };

    const res = await request(app)
      .post("/api/generate-scenario")
      .send(invalidInputs);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(
      "Missing required parameters: technology, role, and environment are all required."
    );
    expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
  });
});
