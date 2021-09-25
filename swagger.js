const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'Eventist API',
    description: 'Description',
  },

  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./index.js");
});

swaggerAutogen(outputFile, endpointsFiles, doc). then(() => {require('./index.js')});
