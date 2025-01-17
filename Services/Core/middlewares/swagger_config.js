import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'NEX Core Service API',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./Presentation/routes.js']; // Add all your route entry points

swaggerAutogen()(outputFile, endpointsFiles, doc);
