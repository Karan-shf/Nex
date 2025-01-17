import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'NEX Media Service API',
    },
    host: 'localhost:8088',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./Presentation/routes.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
