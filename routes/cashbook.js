import express from "express";
import {
  deleteData,
  fetchData,
  fetchDataid,
  fetchDate,
  sendData,
  updateData,
} from "../controllers/cashbook.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/cashbook");
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

router.post("/sendData", upload.single("image"), (req, res) => {
  const q =
    "INSERT INTO cashbook_module (`cash_pay`,`cash_receive`,`cash_mode`,`cash_date`,`cash_description`,`cash_bill`) VALUES (?)";
  const values = [
    req.body.cash_pay,
    req.body.cash_receive,
    req.body.cash_mode,
    req.body.cash_date,
    req.body.cash_description,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("INSERTED SUCCESSFULLY");
  });
});
router.get("/fetchData", fetchData);
router.get("/fetchDataid/:cashId", fetchDataid);
router.delete("/deleteData/:cashid", deleteData);
router.put("/updateData/:cashUP", updateData);
router.get("/fetchDate", fetchDate);
export default router;
