import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import ConnectMongo from "./components/commons/database/connectMongo.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import config from "./config/dev.js";
import swaggerOptions from "./config/swagger.js";
import auth from "./components/auth/authRoute.js";
import user from "./components/users/userRouter.js";
import category from "./components/categories/categoryRouter.js";
import product from "./components/products/productRouter.js";
import staff from "./components/staffs/staffRouter.js";

const app = express();
app.use(express.json());
ConnectMongo.getConnect();
app.use(express.json());

// middleware
app.use(cors());

// swagger Documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerUiHandler = swaggerUi.setup(swaggerSpec);
const docsJsonPath = "/api-docs.json";

app.get(docsJsonPath, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/docs", swaggerUi.serve, (req, res, next) => {
  if (!req.query.url) {
    res.redirect(
      `/docs?url=${req.protocol}://${req.headers.host}${docsJsonPath}`
    );
  } else {
    swaggerUiHandler(req, res, next);
  }
});

app.use(
  bodyParser.json({
    limit: config.bodyLimit,
  })
);

// hook morganBody to express app
if (process.env.NODE_ENV === "development") {
  morganBody(app);
}

// api routes to /api
// app.use("/api", routes);

app.use("/auth", auth);
app.use("/user", user);
app.use("/category", category);
app.use("/product", product);
app.use("/staff", staff);

app.use(errorMiddleware);
app.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
export default app;
