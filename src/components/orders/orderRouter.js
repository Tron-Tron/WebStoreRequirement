import express from "express";
import {
  createOrder,
  getOrder,
  deleteOrderByIdOfUser,
  deleteOrderByIdOfAdmin,
  updateStatusOrder,
  getOrderOfUser,
} from "./orderController.js";
import orderValidate from "./orderValidate.js";
import validateMiddleware from "../commons/validateMiddleware.js";
import authorize from "../../middleware/authorize.js";
import jwtAuth from "../../middleware/jwtAuth.js";
const router = express.Router();
const routerStaff = express.Router();
const routerUser = express.Router();
router.use("/user", routerUser);
routerUser.use(jwtAuth, authorize("guest"));
routerUser.post("/", createOrder);
routerUser.get("/", getOrder);
routerUser.delete(
  "/:orderId",
  validateMiddleware(orderValidate.paramOrder, "params"),
  deleteOrderByIdOfUser
);

router.use("/staff", routerStaff);
routerStaff.use(jwtAuth, authorize("employee", "owner"));
routerStaff.patch(
  "/:orderId",
  validateMiddleware(orderValidate.paramOrder, "params"),
  updateStatusOrder
);
routerStaff.get(
  "/:cartId",
  validateMiddleware(orderValidate.paramCart, "params"),
  getOrderOfUser
);
routerStaff.delete(
  "/:orderId",
  validateMiddleware(orderValidate.paramOrder, "params"),
  deleteOrderByIdOfAdmin
);
export default router;

// use('/order')

// use('/user', checkUser)
// /api/order/me {page, limit, status, }
// order[]
// /api/{component}/{object}/{action}
