import express from "express";
import cors from "cors";
import authCustomer from "./routes/customer.js";
import authProduct from "./routes/product.js";
import authSupplier from "./routes/supplier.js";
import authService from "./routes/service.js";
import authCashbook from "./routes/cashbook.js";
import authAccount from "./routes/account.js";
import authExpenses from "./routes/expenses.js";
import authSales from "./routes/sales.js";
import authReports from "./routes/reports.js";
import authPurchase from "./routes/purchase.js";
import authLogin from "./routes/auth.js";
import { db } from "./connect.js";
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use("/api/auth", authCustomer);
app.use("/api/sup", authSupplier);
app.use("/api/auth", authProduct);
app.use("/api/ser", authService);
app.use("/api/cash", authCashbook);
app.use("/api/act", authAccount);
app.use("/api/exp", authExpenses);
app.use("/api/sale", authSales);
app.use("/api/rep", authReports);
app.use("/api/purchase", authPurchase);
app.use("/api/log", authLogin);

app.use(express.static("./public"));
db.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});
app.listen(8000, () => {
  console.log("App is running ");
});
