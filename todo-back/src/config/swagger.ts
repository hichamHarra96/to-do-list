import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API pour gérer les tâches (CRUD)",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Serveur local",
            },
        ],
    },
    apis: ["src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

// Fonction pour activer Swagger dans l'application Express
export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
