import express from "express";
import {
  fetchData,
  fetchDataById,
  addSales,
  fetchSaleTran,
  delSales,
  fetchSalesPrefixData,
  updateStockQty,

} from "../controllers/sales.js";


const router = express.Router();

router.post("/addSales", addSales);
router.get("/fetchData", fetchData);
router.get("/fetchDataById/:saleId", fetchDataById);
router.get("/fetchSaleTran/:saleId", fetchSaleTran);
router.delete("/delSales/:saleId", delSales);
router.get("/fetchSalesPrefixData", fetchSalesPrefixData);
router.put("/updateStockQty" , updateStockQty);
export default router;
