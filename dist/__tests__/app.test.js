"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const scenarioGenerator = __importStar(require("../services/scenarioGenerator")); // Import the module to mock
describe('App and API Integration Tests', () => {
    beforeEach(() => {
        // Mock the generateScenario function to return a predictable result
        // This mock now dynamically returns the 'originalInputs' that were passed to it,
        // which aligns with the test's expectation for the API response.
        jest.spyOn(scenarioGenerator, 'generateScenario').mockImplementation((inputs) => {
            return {
                originalInputs: inputs, // Return the inputs that were passed to the mocked function
                scenario: {
                    challenge: 'Mock Challenge',
                    incident: 'Mock Incident',
                    troubleshootingStep: 'Mock Troubleshooting Step',
                },
            };
        });
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Clean up mocks after each test
    });
    it('should respond with a 200 status for the health check endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('API is healthy');
    }));
    it('should return a 200 status and a scenario for valid POST request to /api/generate-scenario', () => __awaiter(void 0, void 0, void 0, function* () {
        const validInputs = {
            technology: 'Cloud Computing',
            role: 'DevOps Engineer',
            environment: 'Cloud Infrastructure',
        };
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/generate-scenario').send(validInputs);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('originalInputs');
        expect(res.body.originalInputs).toEqual(validInputs); // Now this assertion will pass
        expect(res.body).toHaveProperty('scenario');
        expect(res.body.scenario).toHaveProperty('challenge');
        expect(res.body.scenario).toHaveProperty('incident');
        expect(res.body.scenario).toHaveProperty('troubleshootingStep');
        expect(scenarioGenerator.generateScenario).toHaveBeenCalledWith(validInputs);
    }));
    it('should return a 400 status for missing technology in POST request', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidInputs = {
            role: 'DevOps Engineer',
            environment: 'Cloud Infrastructure',
        };
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/generate-scenario').send(invalidInputs);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Missing required parameters: technology, role, and environment are all required.');
        expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
    }));
    it('should return a 400 status for missing role in POST request', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidInputs = {
            technology: 'Cloud Computing',
            environment: 'Cloud Infrastructure',
        };
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/generate-scenario').send(invalidInputs);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Missing required parameters: technology, role, and environment are all required.');
        expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
    }));
    it('should return a 400 status for missing environment in POST request', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidInputs = {
            technology: 'Cloud Computing',
            role: 'System Administrator',
        };
        const res = yield (0, supertest_1.default)(app_1.default).post('/api/generate-scenario').send(invalidInputs);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Missing required parameters: technology, role, and environment are all required.');
        expect(scenarioGenerator.generateScenario).not.toHaveBeenCalled();
    }));
});
