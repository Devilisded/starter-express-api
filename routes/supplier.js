import express from "express";
import {
  delSup,
  delTran,
  fetchAll,
  fetchData,
  fetchSup,
  fetchTran,
  fetchTranid,
  sendData,
  updateSup,
  //updateTran,
  fetchSupDataUsingId,
  fetchSupLastTran
} from "../controllers/supplier.js";
import { db } from "../connect.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/sup");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
router.post("/sendData", sendData);
router.get("/fetchData", fetchData);
router.post("/sendTran", upload.single("image"), (req, res) => {
  const q =
    "INSERT INTO supplier_tran(`sup_tran_pay`,`sup_tran_receive`,`sup_tran_description`,`sup_tran_date`,`sup_tran_cnct_id`, `sup_balance` ,`sup_tran_bill`) VALUES (?)";
  const values = [
    req.body.sup_tran_pay,
    req.body.sup_tran_receive,
    req.body.sup_tran_description,
    req.body.sup_tran_date,
    req.body.sup_tran_cnct_id,
    req.body.sup_balance,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Data Has been Entered");
  });
});
router.get("/fetchTran/:supId", fetchTran);
router.get("/fetchAll", fetchAll);
router.get("/fetchSup/:sup_id", fetchSup);
router.delete("/delSup/:delId", delSup);
router.put("/updateSup/:updateId", updateSup);
router.get("/fetchTranid/:tranId", fetchTranid);
router.delete("/delTran/:dtranId", delTran);
//router.put("/updateTran/:upTran", updateTran);

router.put("/updateTran/:tranId", upload.single("image"), (req, res) => {
  console.log("req.body : ",req.body)
  console.log("req.file : ",req.file)
  const q =
  "UPDATE supplier_tran SET sup_tran_pay = ?, sup_tran_receive = ? , sup_tran_description = ? , sup_tran_date = ? , sup_balance = ? , sup_tran_bill = ? where sup_tran_id = ?";

  const values = [
    req.body.sup_tran_pay,
    req.body.sup_tran_receive,
    req.body.sup_tran_description,
    req.body.sup_tran_date,
    req.body.sup_balance,
    req.file ? req.file.filename : "",
    req.params.tranId
  ];
  console.log("values : ",values , q)
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
});

router.get("/fetchSupDataUsingId/:sup_id", fetchSupDataUsingId,);
router.get("/fetchSupLastTran/:sup_tran_cnct_id", fetchSupLastTran);

export default router;
  