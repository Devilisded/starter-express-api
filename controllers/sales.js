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

export const updateStockQty = (req, res) => {
  // //const q = "UPDATE product_module SET balance_stock = ? where product_id = ?";
  const values = req.body.invoiceItemsList
    .filter((i) => i.in_cat === 1)
    .map((item) => [item.in_b_stock, item.in_id]);

  console.log("values : ", values);

  // var i = 0;
  // var len = values.length;

  // if (i < len) {
  //   //console.log(" i : " , typeof(i) , typeof(len))
  //   const q =
  //     "UPDATE product_module SET balance_stock = ? where product_id = ?";
  //   const values2 = [values[i][0], values[i][1]];
  //   console.log("values2 : ", values2);
  //   db.query(q, values2, (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     i++;
  //   });

  // } else {
  //   return res.status(200).json("Updated Successfully");
  // }
  let sql = "UPDATE product_module u JOIN (";
  const BATCH_SIZE = 3000;
  for (let i = 0; i < values.length; i += BATCH_SIZE) {
    console.log("BATCH_SIZE : " ,i)
    let nestedSql = "";
    for (let j = 0; i < BATCH_SIZE; j++) {
      const userData = values[i + j];
    }
    sql += `${nestedSql}) a on u.product_id = a.product_id SET u.balance_stock = a.in_b_stock;`;
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json(err);
    });
  }
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

export const delSales = (req, res) => {
  const q =
    "DELETE sale_module.* , sale_tran.* from sale_module LEFT JOIN sale_tran ON sale_module.sale_id = sale_tran.sale_tran_id WHERE sale_id = ?";
  db.query(q, [req.params.saleId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
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
