import express from "express";
import {
  addProduct,
  fetchProductData,
  fetchProductTran,
  addStockIn,
  fetchStockInTran,
  fetchProductUnits,
  fetchProductHsnCodes,
  updateStockQty,
  fetchTotalStockValue,
  delproduct,
  updateProduct,
} from "../controllers/product.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/product");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
});
router.post("/addProduct", upload.single("image"), (req, res) => {
  const q =
    "INSERT INTO product_module (`product_name`, `primary_unit`, `secondary_unit`, `sale_price`, `purchase_price`, `tax`, `opening_stock`, `low_stock`, `balance_stock`, `entry_date`, `hsn_code`, `hsn_desc`, `sgst`, `igst`, `cess` , `conversion` , `cgst`,`product_image`) Values (?)";
  const values = [
    req.body.product_name,
    req.body.primary_unit,
    req.body.secondary_unit,
    req.body.sale_price,
    req.body.purchase_price,
    req.body.tax,
    req.body.opening_stock,
    req.body.low_stock,
    req.body.balance_stock,
    req.body.entry_date,
    req.body.hsn_code,
    req.body.hsn_desc,
    req.body.sgst,
    req.body.igst,
    req.body.cess,
    req.body.conversion,
    req.body.cgst,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated");
  });
});
router.get("/fetchProductData", fetchProductData);
router.get("/fetchProductTran/:prodId", fetchProductTran);
router.post("/addStockIn", addStockIn);
router.get("/fetchStockInTran/:c_id", fetchStockInTran);

router.get("/fetchProductUnits", fetchProductUnits);
router.get("/fetchProductHsnCodes", fetchProductHsnCodes);
router.put("/updateStockQty/:productid", updateStockQty);
router.get("/fetchTotalStockValue", fetchTotalStockValue);
router.delete("/delproduct/:pId", delproduct);

//router.put("/updateProduct/:prodId", updateProduct);

router.put("/updateProduct/:prodId", upload.single("image"), (req, res) => {
  console.log("req.body : ",req.body)
  console.log("req.file : ",req.file)
  const q =
    "UPDATE product_module SET product_name = ?, primary_unit = ? , secondary_unit = ? , sale_price = ? , purchase_price = ? , tax = ?, low_stock = ? ,balance_stock = ? , entry_date = ? ,hsn_code = ?, hsn_desc = ?, sgst = ?, igst = ?, cess = ? , conversion = ? , cgst = ?, product_image = ? where product_id = ?";
  const values = [
    req.body.product_name,
    req.body.primary_unit,
    req.body.secondary_unit,
    req.body.sale_price,
    req.body.purchase_price,
    req.body.tax,
    //req.body.opening_stock,
    req.body.low_stock,
    req.body.balance_stock,
    req.body.entry_date,
    req.body.hsn_code,
    req.body.hsn_desc,
    req.body.sgst,
    req.body.igst,
    req.body.cess,
    req.body.conversion,
    req.body.cgst,
    req.file ? req.file.filename : "",
    req.params.prodId
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated");
  });
});

export default router;
