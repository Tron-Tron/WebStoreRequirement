import express from "express";
import {
  createReportProduct,
  createReportCategory,
} from "./reportController.js";
const router = express.Router();
router.post("/", createReportProduct);
router.post("/cate", createReportCategory);

export default router;
