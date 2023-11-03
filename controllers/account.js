import { db } from "../connect.js";

export const sendData = (req, res) => {
  const q =
    "INSERT into business_account (`business_name`,`business_address`,`business_gst`,`business_type`,`business_nature`) VALUES(?)";
  const values = [
    req.body.business_name,
    req.body.business_address,
    req.body.business_gst,
    req.body.business_type,
    req.body.business_nature,
  ];
  console.log("values : ",values)
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("INSERTED SUCCESSFULLY");
  });
};

export const fetchData = (req, res) => {
  const q = "SELECT * from business_account";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delData = (req, res) => {
  const q = "TRUNCATE TABLE business_account";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};
