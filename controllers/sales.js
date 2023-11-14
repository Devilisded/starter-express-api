import { db } from "../connect.js";

export const addSales = (req, res) => {
  console.log(req.body);
  const q1 =
    "INSERT INTO sale_module (`sale_name`,`sale_prefix`,`sale_prefix_no`,`sale_amt`, `sale_date` , cust_cnct_id , sale_amt_paid , sale_amt_due , sale_amt_type ) VALUES(?)";
  const values1 = [
    req.body.sale_name,
    req.body.sale_prefix,
    req.body.sale_prefix_no,
    req.body.sale_amt,
    req.body.sale_date,
    req.body.cust_cnct_id,
    req.body.sale_amt_paid,
    req.body.sale_amt_due,
    req.body.sale_amt_type,
  ];
  db.query(q1, [values1], (err, data) => {
    if (err) return res.status(500).json(err);
    const id1 = data.insertId;
    const q2 =
      "INSERT INTO sale_tran ( `sale_cnct_id`, `sale_item_name`, `sale_item_qty`, `sale_item_price`, `sale_item_code` ,`sale_item_unit` , `sale_item_disc_unit` , `sale_item_disc_val` , `sale_item_disc_price` , `sale_item_gst` , `sale_item_gst_amt`) Values ?";
    const values2 = req.body.invoiceItemsList.map((values) => [
      id1,
      values.in_items,
      values.in_qty,
      values.in_sale_price,
      values.in_hsn_sac,
      values.in_unit,
      values.in_discount_unit,
      values.in_discount_value,
      values.in_discount_price,
      values.in_gst_prectentage,
      values.in_gst_amt,
    ]);

    db.query(q2, [values2], (err, data) => {
      if (err) return res.status(500).json(err);

      const custData =
        "INSERT INTO customer_tran(`tran_pay`,`tran_date`,`cnct_id`, `tran_sale_cnct_id`) VALUES (?)";
      const custValues = [
        req.body.sale_amt,
        req.body.sale_date,
        req.body.cust_cnct_id,
        id1,
      ];

      db.query(custData, [custValues], (err, data) => {
        if (err) return res.status(500).json(err);

        const q3 =
          "INSERT INTO stock_data (`product_stock_out` ,`primary_unit`, `sale_price`,`entry_date`,`cnct_id`,`selected_unit`) VALUES ?";

        const values3 = req.body.invoiceItemsList
          .filter((i) => i.in_cat === 1)
          .map((item) => [
            item.in_qty,
            item.in_unit,
            item.in_sale_price,
            req.body.sale_date,
            item.in_id,
            item.in_unit,
          ]);

        const q4 =
          "INSERT INTO service_tran (`ser_tran_price`,`ser_quantity`,`ser_date`,`ser_cnct_id`) VALUES ?";

        const values4 = req.body.invoiceItemsList
          .filter((i) => i.in_cat === 0)
          .map((item) => [
            item.in_sale_price,
            item.in_qty,
            req.body.sale_date,
            item.in_id,
          ]);

        const cashBookData =
          "INSERT INTO cashbook_module (`cash_receive`,`cash_mode`,`cash_date`, `cash_description` , `cash_sale_cnct_id`) VALUES (?)";
        const cashBookValues = [
          req.body.sale_amt,
          req.body.sale_amt_type,
          req.body.sale_date,
          req.body.sale_desc,
          id1,
        ];

        if (values3.length > 0) {
          db.query(q3, [values3], (err, data) => {
            if (err) return res.status(500).json(err);
          });

          if (values4.length > 0) {
            db.query(q4, [values4], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Transaction has been Entered");
            });
          } else {
            if (req.body.sale_desc === "PAYMENT IN") {
              console.log("cashBookValues1 : ", cashBookValues);
              db.query(cashBookData, [cashBookValues], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("INSERTED SUCCESSFULLY");
              });
            } else {
              return res.status(200).json("Transaction has been Entered");
            }
          }
        } else {
          if (values4.length > 0) {
            db.query(q4, [values4], (err, data) => {
              if (err) return res.status(500).json(err);

              if (req.body.sale_desc === "PAYMENT IN") {
                console.log("cashBookValues2 : ", cashBookValues);
                db.query(cashBookData, [cashBookValues], (err, data) => {
                  if (err) return res.status(500).json(err);
                  return res.status(200).json("INSERTED SUCCESSFULLY");
                });
              } else {
                return res.status(200).json("Transaction has been Entered");
              }
            });
          }
        }
      });
    });
  });
};

export const updateProductStockQty = (req, res) => {
  var query = "UPDATE product_module SET balance_stock = CASE ";
  const cases = req.body.invoiceItemsList
    .filter((i) => i.in_cat === 1)
    .map(
      (update) =>
        `WHEN product_id = ${update.in_id} THEN '${update.in_b_stock}'`
    )
    .join(" ");
  query += `${cases} END WHERE product_id IN (${req.body.invoiceItemsList
    .map((update) => update.in_id)
    .join(", ")})`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      res.send("Multiple rows updated successfully");
    }
  });
};



export const updateServicesSalesQty = (req, res) => {
  var query = "UPDATE service_module SET ser_sales = CASE ";
  const cases = req.body.invoiceItemsList
    .filter((i) => i.in_cat === 0)
    .map(
      (update) => `WHEN ser_id = ${update.in_id} THEN '${update.in_sales_no}'`
    )
    .join(" ");
  query += `${cases} END WHERE ser_id IN (${req.body.invoiceItemsList
    .map((update) => update.in_id)
    .join(", ")})`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      res.send("Multiple rows updated successfully");
    }
  });
};

export const fetchData = (req, res) => {
  const q = "SELECT * from sale_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchDataById = (req, res) => {
  const q = "SELECT * from sale_module where sale_id = ?";
  db.query(q, [req.params.saleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSaleTran = (req, res) => {
  const q = "SELECT * from sale_tran WHERE sale_cnct_id = ?";
  db.query(q, [req.params.saleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSalesPrefixData = (req, res) => {
  const q =
    "select distinct sale_prefix , max(sale_prefix_no) as sale_prefix_no from sale_module group by sale_prefix ORDER By sale_prefix = 'Invoice' DESC ;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delSales = (req, res) => {
  const q =
    "DELETE sale_module.* , sale_tran.*, cashbook_module.* , customer_tran.* from sale_module LEFT JOIN sale_tran ON sale_module.sale_id = sale_tran.sale_tran_id LEFT JOIN cashbook_module on sale_module.sale_id = cashbook_module.cash_sale_cnct_id LEFT JOIN customer_tran on sale_module.sale_id = customer_tran.tran_sale_cnct_id  WHERE sale_id = ?";
  db.query(q, [req.params.saleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

export const addSalePayment = (req, res) => {
  console.log("req.body :", req.body);
  // const q1 =
  //   "INSERT INTO sale_payment_in (`sale_cnct_id`,`sale_recipt`,`sale_recipt_no`,`sale_amt_in`, `sale_amt_in_date` , sale_amt_in_mode ) VALUES(?)";
  // const values1 = [
  //   req.body.sale_cnct_id,
  //   req.body.sale_recipt,
  //   req.body.sale_recipt_no,
  //   req.body.sale_amt_in,
  //   req.body.sale_amt_in_date,
  //   req.body.sale_amt_in_mode,
  // ];
  // db.query(q1, [values1], (err, data) => {
  //   if (err) return res.status(500).json(err);
  const q1 =
    "INSERT INTO sale_module (`sale_prefix` , `sale_prefix_no` , `sale_name` , `sale_date` , `cust_cnct_id` , `sale_amt_type` ,  `sale_amt_paid` , `sale_payment_in_id` , `sale_payment_in_prefix` , `sale_payment_in_prefix_no`  ) VALUES(?)";
  const values1 = [
    req.body.sale_prefix,
    req.body.sale_prefix_no,
    req.body.sale_name,
    req.body.sale_amt_in_date,
    req.body.sale_cust_cnct_id,
    req.body.sale_amt_in_mode,
    req.body.sale_amt_in,
    req.body.sale_cnct_id,
    req.body.sale_payment_in_prefix,
    req.body.sale_payment_in_prefix_no,
  ];
  db.query(q1, [values1], (err, data) => {
    if (err) return res.status(500).json(err);
    const id1 = data.insertId;

    const custData =
      "INSERT INTO customer_tran(`tran_receive`,`tran_date`,`cnct_id` , `tran_sale_cnct_id`) VALUES (?)";
    const custValues = [
      req.body.sale_amt_in,
      req.body.sale_amt_in_date,
      req.body.sale_cust_cnct_id,
      //req.body.sale_cnct_id,
      id1,
    ];
    db.query(custData, [custValues], (err, data) => {
      if (err) return res.status(500).json(err);
      const cashBookData =
        "INSERT INTO cashbook_module (`cash_receive`,`cash_mode`,`cash_date`, `cash_description` , `cash_sale_cnct_id`) VALUES (?)";
      const cashBookValues = [
        req.body.sale_amt_in,
        req.body.sale_amt_in_mode,
        req.body.sale_amt_in_date,
        req.body.sale_desc,
        //req.body.sale_cnct_id,
        id1,
      ];
      db.query(cashBookData, [cashBookValues], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("INSERTED SUCCESSFULLY");
      });
    });
  });
};



export const updateBalanceDue = (req, res) => {
  const q = "UPDATE sale_module SET sale_amt_paid = ? ,sale_amt_due = ? where sale_id = ?";
  const values = [req.body.amt_paid, req.body.amt_due, req.body.sale_cnct_id];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};


export const fetchPaymentPrefixData = (req, res) => {
  const q =
    "select distinct sale_payment_in_prefix , max(sale_payment_in_prefix_no) as sale_payment_in_prefix_no from sale_module group by sale_payment_in_prefix ORDER By sale_payment_in_prefix = 'PaymentIn' DESC ;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateExpenses = (req, res) => {
  const values = [
    req.body.exp_date,
    req.body.exp_category,
    req.body.exp_total,
    req.params.expId,
  ];
  console.log(values);

  const q =
    "UPDATE expenses_module SET exp_date = ? ,exp_category = ? ,exp_total = ? WHERE exp_id = ?";

  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
