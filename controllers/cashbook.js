import { db } from "../connect.js";

export const sendData = (req, res) => {
  const q =
    "INSERT INTO cashbook_module (`cash_pay`,`cash_receive`,`cash_mode`,`cash_date`,`cash_description`) VALUES (?)";
  const values = [
    req.body.cash_pay,
    req.body.cash_receive,
    req.body.cash_mode,
    req.body.cash_date,
    req.body.cash_description,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("INSERTED SUCCESSFULLY");
  });
};

export const fetchData = (req, res) => {
  const q = "SELECT * from cashbook_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchDataid = (req, res) => {
  const q = "SELECT * from cashbook_module WHERE cash_id = ?";
  db.query(q, [req.params.cashId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteData = (req, res) => {
  const q = "DELETE from cashbook_module WHERE cash_id = ?";
  db.query(q, [req.params.cashid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

export const updateData = (req, res) => {
  const q =
    "UPDATE cashbook_module SET cash_pay = ? , cash_receive = ? ,cash_mode = ? , cash_date = ? ,cash_description = ? WHERE cash_id = ?";
  const values = [
    req.body.cash_pay,
    req.body.cash_receive,
    req.body.cash_mode,
    req.body.cash_date,
    req.body.cash_description,
    req.params.cashUP,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const fetchDate = (req, res) => {
  const q = "SELECT * from cashbook_module WHERE cash_date = ? ";
  db.query(q, req.params.cashDate, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
