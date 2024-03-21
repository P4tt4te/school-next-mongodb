import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  openApiVersion: "3.0.0",
  title: "Next Swagger API Example",
  version: "1.0.0",
  apiFolder: "pages/api",
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Next Swagger API Example",
      version: "1.0",
    },
  },
});

export default swaggerHandler();
