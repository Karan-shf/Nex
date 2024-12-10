// import swaggerJSDoc from "swagger-jsdoc";

// const swaggerOptions = {
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'API Documentation',
//         version: '1.0.0',
//         description: 'NEX IAM Service API',
//       },
//       servers: [
//         {
//           url: 'http://localhost:8000', // Replace with your server URL
//         },
//       ],
//     },
//     apis: ['./Presentation/routes/*.js'], // Path to your API routes files
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// export default swaggerSpec;

// const swaggerAutogen = require('swagger-autogen')();
import swaggerAutogen from "swagger-autogen"

const doc = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'NEX IAM Service API',
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./Presentation/routes.js']; // Add all your route entry points

swaggerAutogen()(outputFile, endpointsFiles, doc);
