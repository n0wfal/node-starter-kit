export const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Node Starter",
      description: "Node JS typescript starter kit.",
    }
  },
  apis: ["./*.js", './*.ts', 'src/routes/*.ts']
};