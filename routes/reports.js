import express from "express";
import {
  fetchBoth,
  fetchCash,
  fetchSales,
  fetchSup,
  fetchPurchase,
} from "../controllers/reports.js";

const router = express.Router();

router.get("/fetchBoth", fetchBoth);
router.get("/fetchSupBoth", fetchSup);
router.get("/fetchCash", fetchCash);
router.get("/fetchSale", fetchSales);
router.get("/fetchPurchase", fetchPurchase);

export default router;
