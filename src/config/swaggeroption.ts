export const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "0.0.0",
            description: "Restaurant Management Api"
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        }
        ,
        security: [{
            jwt: []
        }],
        swagger: "0.0",
        servers: [
            {
                url: `http://172.22.4.50:7000`
            }
        ],
    },
    apis: ['./src/api-docs/*.ts']
}