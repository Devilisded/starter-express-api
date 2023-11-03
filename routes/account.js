import express from "express";
import { delData, fetchData } from "../controllers/account.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/account");
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

router.post(
  "/sendData",
  upload.fields([
    { name: "business", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    const q =
      "INSERT into business_account (`business_name`,`business_address`,`business_gst`,`business_type`,`business_nature`,`business_logo`,`business_signature`) VALUES(?)";
    const values = [
      req.body.business_name,
      req.body.business_address,
      req.body.business_gst,
      req.body.business_type,
      req.body.business_nature,
      req.files.signature[0] ? req.files.signature[0].filename : "",
      req.files.business[0] ? req.files.business[0].filename : "",
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("INSERTED SUCCESSFULLY");
    });
  }
);
router.get("/fetchData", fetchData);
router.delete("/delData", delData);
export default router;
