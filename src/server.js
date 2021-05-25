import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
//
ConnectMongo.getConnect();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";

import swaggerUi from "swagger-ui-express";
import ConnectMongo from "./components/commons/database/connectMongo.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import config from "./config/dev.js";

import mySwaggerDocument from "./mySwaggerDocument.json";
import swagger from "./swagger.json";
// import routes from "./routes/index.js";
import auth from "./components/auth/authRoute.js";
import user from "./components/users/userRouter.js";
import category from "./components/categories/categoryRouter.js";
import product from "./components/products/productRouter.js";
import staff from "./components/staffs/staffRouter.js";
import cart from "./components/carts/cartRouter.js";
import order from "./components/orders/orderRouter.js";
import report from "./components/reports/reportRouter.js";
import notifi from "./components/notification/notificationRouter.js";

const app = express();
app.use(express.json());

// middleware
app.use(cors());

const swaggerUiHandler = swaggerUi.setup(mySwaggerDocument);

app.use("/docs", swaggerUi.serve, swaggerUiHandler);

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
//app.use("/api", routes);

app.use("/auth", auth);
app.use("/user", user);
app.use("/category", category);
app.use("/product", product);
app.use("/staff", staff);
app.use("/cart", cart);
app.use("/order", order);
app.use("/report", report);
app.use("/notifi", notifi);
app.use("/docs", swaggerUi.serve, swaggerUiHandler);
app.use(errorMiddleware);
app.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
export default app;
