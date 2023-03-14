exports.swagger_option =
{
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVER_PORT}`,
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js", "./src/models/*.js"],
};

