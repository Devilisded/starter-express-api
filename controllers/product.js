import { db } from "../connect.js";

export const addProduct = (req, res) => {
  console.log(req.body);
  const q =
    "INSERT INTO product_module (`product_name`, `primary_unit`, `secondary_unit`, `sale_price`, `purchase_price`, `tax`, `opening_stock`, `low_stock`, `balance_stock`, `entry_date`, `hsn_code`, `hsn_desc`, `sgst`, `igst`, `cess` , `conversion` , `cgst`) Values (?)";
  const values = [
    req.body.product_name,
    req.body.primary_unit,
    req.body.secondary_unit,
    req.body.sale_price,
    req.body.purchase_price,
    req.body.tax,
    req.body.opening_stock,
    req.body.low_stock,
    req.body.balance_stock,
    req.body.entry_date,
    req.body.hsn_code,
    req.body.hsn_desc,
    req.body.sgst,
    req.body.igst,
    req.body.cess,
    req.body.conversion,
    req.body.cgst,
  ];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated");
  });
};

export const updateStockQty = (req, res) => {
  const q = "UPDATE product_module SET balance_stock = ? where product_id = ?";
  const values = [req.body.updatedStockQty, req.params.productid];
  console.log(values);
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const fetchProductData = (req, res) => {
  const q = "SELECT * from product_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchProductTran = (req, res) => {
  const q = "SELECT * from product_module where product_id = ?";
  db.query(q, req.params.prodId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchTotalStockValue = (req, res) => {
  const q =
    "select distinct sum(balance_stock * sale_price) as stockValue, (select count(*)  from accbook.product_module where balance_stock <= low_stock) as lowStockProducts from accbook.product_module;";
  db.query(q, req.params.prodId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addStockIn = (req, res) => {
  const q =
    "INSERT INTO stock_data (`tran_id`,`product_stock_in`, `product_stock_out` ,`primary_unit`,`secondary_unit`, `purchase_price`, `sale_price`, `product_desc`,`entry_date`,`cnct_id`,`selected_unit`, `balance_stock`) VALUES(?)";
  const values = [
    req.body.tran_id,
    req.body.product_stock_in,
    req.body.product_stock_out,
    req.body.primary_unit,
    req.body.secondary_unit,
    req.body.purchase_price,
    req.body.sale_price,
    req.body.product_desc,
    req.body.entry_date,
    req.body.cnct_id,
    req.body.selected_unit,
    req.body.balance_stock,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Transaction has been Entered");
  });
};

export const fetchStockInTran = (req, res) => {
  const q = "SELECT * from stock_data where cnct_id = ?";
  const values = req.params.c_id;
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchProductUnits = (req, res) => {
  const q = "SELECT * from product_units";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchProductHsnCodes = (req, res) => {
  const q = "SELECT * from hsn_codes";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delproduct = (req, res) => {
  const q =
    "DELETE product_module.*,stock_data.* from product_module LEFT JOIN stock_data ON product_module.product_id = stock_data.cnct_id where product_id = ?";
  db.query(q, [req.params.pId], (err, data) => {
    console.log(req.params.pId);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted SuccessFully");
  });
};

export const updateProduct = (req, res) => {
  const q =
    "UPDATE product_module SET product_name = ? ,primary_unit = ? ,secondary_unit = ? ,sale_price = ? ,purchase_price = ? , tax = ? , opening_stock= ?, low_stock= ?, balance_stock=?, entry_date= ? , hsn_code = ? , hsn_desc = ?, sgst = ? , igst = ? , cess = ? , conversion = ? , cgst = ? WHERE product_id = ?";
  const values = [
    req.body.product_name,
    req.body.primary_unit,
    req.body.secondary_unit,
    req.body.sale_price,
    req.body.purchase_price,
    req.body.tax,
    req.body.opening_stock,
    req.body.low_stock,
    req.body.balance_stock,
    req.body.entry_date,
    req.body.hsn_code,
    req.body.hsn_desc,
    req.body.sgst,
    req.body.igst,
    req.body.cess,
    req.body.conversion,
    req.body.cgst,
    req.params.prodId,
  ];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
