import express from "express";
import {
  delData,
  delTran,
  fetchData,
  fetchDataById,
  fetchTranData,
  fetchTranid,
  sendData,
  sendTran,
  updateData,
  updateTran,
  fetchSerTranData
} from "../controllers/service.js";

const router = express.Router();

router.post("/sendData", sendData);
router.get("/fetchData", fetchData);
router.get("/fetchDataid/:serId", fetchDataById);
router.post("/sendTran", sendTran);
router.get("/fetchTranid/:cnctId", fetchTranid);
router.delete("/delData/:serCnct", delData);
router.put("/updateData/:serid", updateData);
router.delete("/delTran/:tranId", delTran);
router.get("/fetchTranData/:tranid", fetchTranData);
router.put("/updateTran/:serTranid", updateTran);
router.get("/fetchSerTranData", fetchSerTranData);

export default router;
