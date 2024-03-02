import  swaggerJsdoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Authentication API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: {
            bearerAuth: [],
        }
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

export default swaggerDocs;