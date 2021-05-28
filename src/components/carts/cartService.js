import { baseService } from "../utils/baseService.js";
import Cart from "./cartModel.js";
export const cartService = baseService.bind(null, Cart)();
