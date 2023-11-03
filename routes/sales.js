import express from "express";
import {
  fetchData,
  fetchDataById,
  addSales,
  fetchSaleTran,
  delSales,
  fetchSalesPrefixData

} from "../controllers/sales.js";


const router = express.Router();

router.post("/addSales", addSales);
router.get("/fetchData", fetchData);
router.get("/fetchDataById/:saleId", fetchDataById);
router.get("/fetchSaleTran/:saleId", fetchSaleTran);
router.delete("/delSales/:saleId", delSales);
router.get("/fetchSalesPrefixData", fetchSalesPrefixData);
export default router;
