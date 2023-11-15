import { db } from "../connect.js";

export const fetchBoth = (req, res) => {
  const q =
    "SELECT * from customer_tran LEFT JOIN customer_module ON customer_tran.cnct_id = customer_module.cust_id ORDER BY tran_date";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSup = (req, res) => {
  const q =
    "SELECT * from supplier_tran LEFT JOIN supplier_module ON supplier_tran.sup_tran_cnct_id = supplier_module.sup_id ORDER BY sup_tran_date";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchCash = (req, res) => {
  const q =
    "SELECT SUM(cash_pay) AS pay_sum, SUM(cash_receive) AS receive_sum, cash_date FROM cashbook_module GROUP BY cash_date";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSales = (req, res) => {
  const q = "SELECT * from sale_module WHERE sale_payment_in_prefix IS NULL ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
