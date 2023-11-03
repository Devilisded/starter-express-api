import { db } from "../connect.js";

export const addSales = (req, res) => {
  console.log(req.body)
  const q =
    "INSERT INTO sale_module (`sale_name`,`sale_prefix`,`sale_prefix_no`,`sale_amt`, `sale_date` , cust_cnct_id ) VALUES(?)";
  const values = [
    req.body.sale_name,
    req.body.sale_prefix,
    req.body.sale_prefix_no,
    req.body.sale_amt,
    req.body.sale_date,
    req.body.cust_cnct_id,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const id1 = data.insertId;
    const q1 =
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

    db.query(q1, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Done");
    });
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
