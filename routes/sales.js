import express from "express";
import {
  fetchData,
  fetchDataById,
  addSales,
  fetchSaleTran,
  delSales,
  fetchSalesPrefixData,
  updateProductStockQty,
  updateServicesSalesQty, 
  addSalePayment,
  fetchPaymentPrefixData,
  updateBalanceDue
} from "../controllers/sales.js";


const router = express.Router();

router.post("/addSalePayment", addSalePayment);
router.post("/addSales", addSales);
router.get("/fetchData", fetchData);
router.get("/fetchDataById/:saleId", fetchDataById);
router.get("/fetchSaleTran/:saleId", fetchSaleTran);
router.delete("/delSales/:saleId", delSales);
router.get("/fetchSalesPrefixData", fetchSalesPrefixData);
router.put("/updateProductStockQty" , updateProductStockQty);
router.put("/updateServicesSalesQty" , updateServicesSalesQty);
router.get("/fetchPaymentPrefixData", fetchPaymentPrefixData);
router.put("/updateBalanceDue" , updateBalanceDue);

export default router;
