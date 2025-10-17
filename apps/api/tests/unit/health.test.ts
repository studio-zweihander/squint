import { describe, it, expect } from "bun:test";
import Elysia from "elysia";
import { createErrorHandler } from "../../src/middlewares/error-handler";
import { createHealthRoutes } from "../../src/modules/health/health.routes";

const createTestApp = () => {
    return new Elysia()
        .use(createErrorHandler())
        .use((app) => createHealthRoutes(app))
        .listen(0);
};

describe("GET /api/health", () => {
    it("deve retornar status de saúde", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health"));

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.status).toBe("healthy");
        expect(data.data.timestamp).toBeDefined();
        expect(data.data.uptime).toBeGreaterThanOrEqual(0);
    });

    it("deve incluir informações de ambiente", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health"));

        const data = await response.json();
        expect(data.data.environment).toBeDefined();
        expect(["development", "production", "test"]).toContain(data.data.environment);
    });

    it("deve ter timestamp válido", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health"));

        const data = await response.json();
        expect(new Date(data.data.timestamp)).toBeInstanceOf(Date);
    });
});

describe("GET /api/health/live", () => {
    it("deve retornar liveness probe", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health/live"));

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(data.data.alive).toBe(true);
        expect(data.data.timestamp).toBeDefined();
    });

    it("deve ter timestamp em formato ISO", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health/live"));

        const data = await response.json();
        expect(data.data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
});

describe("GET /api/health/ready", () => {
    it("deve retornar readiness probe", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health/ready"));

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.data).toBeDefined();
        expect(typeof data.data.ready).toBe("boolean");
        expect(data.data.timestamp).toBeDefined();
        expect(data.data.checks).toBeDefined();
    });

    it("deve incluir checks de memória e disco", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health/ready"));

        const data = await response.json();
        expect(data.data.checks).toHaveProperty("memory");
        expect(data.data.checks).toHaveProperty("disk");
        expect(typeof data.data.checks.memory).toBe("boolean");
        expect(typeof data.data.checks.disk).toBe("boolean");
    });

    it("deve estar pronto se all checks passarem", async () => {
        const app = createTestApp();
        const response = await app.handle(new Request("http://localhost/api/health/ready"));

        const data = await response.json();
        const allChecksPassed = Object.values(data.data.checks).every((check) => check === true);

        if (allChecksPassed) {
            expect(data.data.ready).toBe(true);
        }
    });
});

describe("Resposta Padrão", () => {
    it("deve manter padrão de resposta consistente", async () => {
        const app = createTestApp();

        const response1 = await app.handle(new Request("http://localhost/api/health"));
        const response2 = await app.handle(new Request("http://localhost/api/health/live"));
        const response3 = await app.handle(new Request("http://localhost/api/health/ready"));

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        expect(data1).toHaveProperty("success");
        expect(data2).toHaveProperty("success");
        expect(data3).toHaveProperty("success");

        expect(data1).toHaveProperty("data");
        expect(data2).toHaveProperty("data");
        expect(data3).toHaveProperty("data");
    });
});
