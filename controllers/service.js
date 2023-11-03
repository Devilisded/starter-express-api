import { db } from "../connect.js";

export const sendData = (req, res) => {
  const q =
    "INSERT INTO service_module (`ser_name`,`ser_unit`,`ser_price`,`ser_tax_included`, `ser_sac` , `ser_sac_desc` , `ser_sgst` , `ser_igst`, `ser_cgst`, `ser_cess` ) VALUES(?)";
    console.log("values : ",req.body)
    const values = [
    req.body.ser_name,
    req.body.ser_unit,
    req.body.ser_price,
    req.body.ser_tax_included,
    req.body.ser_sac,
    req.body.ser_sac_desc,
    req.body.ser_sgst,
    req.body.ser_igst,
    req.body.ser_cgst,
    req.body.ser_cess,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Product Entered Successfully");
  });
};

export const fetchData = (req, res) => {
  const q = "SELECT * from service_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchDataById = (req, res) => {
  const q = "SELECT * from service_module where ser_id = ?";
  db.query(q, [req.params.serId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const sendTran = (req, res) => {
  const q =
    "INSERT INTO service_tran (`ser_tran_price`,`ser_quantity`,`ser_date`,`ser_description`,`ser_cnct_id`) VALUES(?)";
  const values = [
    req.body.ser_tran_price,
    req.body.ser_quantity,
    req.body.ser_date,
    req.body.ser_description,
    req.body.ser_cnct_id,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DATA ENTERED SUCCESSFULLY");
  });
};

export const fetchSerTranData = (req, res) => {
  const q = "SELECT * from service_tran";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchTranid = (req, res) => {
  const q = "SELECT * from service_tran WHERE ser_cnct_id = ?";
  db.query(q, [req.params.cnctId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delData = (req, res) => {
  const q =
    "DELETE service_module.* , service_tran.* from service_module LEFT JOIN service_tran ON service_module.ser_id = service_tran.ser_cnct_id WHERE ser_id = ?";
  db.query(q, [req.params.serCnct], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

export const updateData = (req, res) => {
  const q =
    "UPDATE service_module SET ser_name = ? , ser_unit = ? , ser_price = ? , ser_sac = ? , ser_sac_desc = ?, ser_igst = ?, ser_sgst = ?, ser_cgst = ?, ser_cess = ?, ser_tax_included = ? , ser_sales = ? WHERE ser_id = ? ";
    console.log(req.body)
    const values = [
    req.body.ser_name,
    req.body.ser_unit,
    req.body.ser_price,
    req.body.ser_sac,
    req.body.ser_sac_desc,
    req.body.ser_igst,
    req.body.ser_sgst,
    req.body.ser_cgst,
    req.body.ser_cess,
    req.body.ser_tax_included,
    req.body.ser_sales,
    req.params.serid,
  ];
  console.log(values)
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("UPDATED SUCCESSFULLY");
  });
};

export const delTran = (req, res) => {
  const q = "DELETE FROM service_tran WHERE ser_tran_id = ? ";
  db.query(q, [req.params.tranId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

export const fetchTranData = (req, res) => {
  const q = "SELECT * from service_tran WHERE ser_tran_id = ?";
  db.query(q, [req.params.tranid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const updateTran = (req, res) => {
  const q =
    "UPDATE service_tran SET ser_tran_price = ? , ser_quantity = ? , ser_date = ? , ser_description = ? , ser_tax_included = ? WHERE ser_tran_id = ? ";
  const values = [
    req.body.ser_tran_price,
    req.body.ser_quantity,
    req.body.ser_date,
    req.body.ser_description,
    req.body.ser_tax_included,
    req.params.serTranid,
  ];
  console.log(values)
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};
