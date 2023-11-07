import express from "express";
import {
  fetchExpenseCategory,
  addExpenseCategory,
  fetchExpenseList,
  addExpenseList,
  delExpenseItemFromList,
  updateExpenseItemData,
  delExpenseCategory,
  updateExpenseCategoryData,
  addExpenses,
  fetchExpensesData,
  fetchExpensesPrefixData,
  fetchExpensesRightTran,
  fetchExpensesTran,
  delexpenses,

  // edit expenses
  updateExpenses,
  fetchExpensesUserAddedItemList,
  DeleteExpensesUserAddedItemList,
  UpdateExpensesUserAddedItemList

} from "../controllers/expenses.js";
const router = express.Router();

router.get("/fetchExpenseCategory", fetchExpenseCategory);
router.get("/fetchExpenseList", fetchExpenseList);
router.post("/addExpenseCategory", addExpenseCategory);
router.post("/addExpenseList", addExpenseList);
router.delete("/delExpenseItemFromList/:eiid", delExpenseItemFromList);
router.put("/updateExpenseItemData/:eiid", updateExpenseItemData);
router.delete("/delExpenseCategory/:ecid", delExpenseCategory);
router.put("/updateExpenseCategoryData/:ecid", updateExpenseCategoryData);

router.post("/addExpenses", addExpenses);
router.get("/fetchExpensesData", fetchExpensesData);
router.get("/fetchExpensesPrefixData", fetchExpensesPrefixData);
router.get("/fetchExpensesRightTran/:expId", fetchExpensesRightTran);
router.get("/fetchExpensesTran/:expId", fetchExpensesTran);
router.delete("/delexpenses/:expId", delexpenses);

router.get("/fetchExpensesUserAddedItemList/:cnct_Id1/:cnct_Id2", fetchExpensesUserAddedItemList);
router.delete("/DeleteExpensesUserAddedItemList/:expId",DeleteExpensesUserAddedItemList);
router.put("/updateExpenses/:expId",updateExpenses);
router.post("/UpdateExpensesUserAddedItemList",UpdateExpensesUserAddedItemList)


export default router;
