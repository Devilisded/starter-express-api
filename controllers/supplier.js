import { db } from "../connect.js";

export const sendData = (req, res) => {
  const q = "SELECT * from supplier_module where sup_number = ?";
  db.query(q, [req.body.sup_number], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Number already Registered");
    const q =
      "INSERT INTO supplier_module(`sup_name`,`sup_number`,`sup_amt`,`sup_amt_type`,`sup_gstin`,`sup_sflat`,`sup_sarea`,`sup_spin`,`sup_scity`,`sup_sstate`,`sup_bflat`,`sup_barea`,`sup_bpin`,`sup_bcity`,`sup_bstate`) VALUES (?)";
    const values = [
      req.body.sup_name,
      req.body.sup_number,
      req.body.sup_amt,
      req.body.sup_amt_type,
      req.body.sup_gstin,
      req.body.sup_sflat,
      req.body.sup_sarea,
      req.body.sup_spin,
      req.body.sup_scity,
      req.body.sup_sstate,
      req.body.sup_bflat,
      req.body.sup_barea,
      req.body.sup_bpin,
      req.body.sup_bcity,
      req.body.sup_bstate,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Supllier Data has been entered");
    });
  });
};

export const fetchData = (req, res) => {
  const q = "SELECT * from supplier_module";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchTran = (req, res) => {
  const q = "SELECT * from supplier_tran  where sup_tran_cnct_id = ?";
  db.query(q, [req.params.supId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchAll = (req, res) => {
  const q = "SELECT * from supplier_tran";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const fetchSup = (req, res) => {
  const q = "SELECT * from supplier_module WHERE sup_id = ?";
  db.query(q, [req.params.sup_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delSup = (req, res) => {
  const q =
    "DELETE supplier_module.* , supplier_tran.* from supplier_module LEFT JOIN supplier_tran ON supplier_module.sup_id = supplier_tran.sup_tran_cnct_id where sup_id = ?";
  db.query(q, [req.params.delId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

export const updateSup = (req, res) => {
  const q =
    "UPDATE supplier_module SET sup_name = ? , sup_number = ? , sup_amt=? , sup_amt_type= ? ,sup_gstin = ? ,sup_sflat = ? , sup_sarea = ? , sup_spin = ? ,sup_scity = ? ,sup_sstate = ?,sup_bflat = ?,sup_barea = ?,sup_bpin = ?,sup_bcity = ?, sup_bstate = ? WHERE sup_id = ?";
  const values = [
    req.body.sup_name,
    req.body.sup_number,
    req.body.sup_amt,
    req.body.sup_amt_type,
    req.body.sup_gstin,
    req.body.sup_sflat,
    req.body.sup_sarea,
    req.body.sup_spin,
    req.body.sup_scity,
    req.body.sup_sstate,
    req.body.sup_bflat,
    req.body.sup_barea,
    req.body.sup_bpin,
    req.body.sup_bcity,
    req.body.sup_bstate,
    req.params.updateId,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("UPDATED SUCCESSFULLY");
  });
};

export const fetchTranid = (req, res) => {
  const q = "SELECT * from supplier_tran WHERE sup_tran_id = ?";
  db.query(q, req.params.tranId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delTran = (req, res) => {
  const q = "DELETE FROM supplier_tran WHERE sup_tran_id = ?";
  db.query(q, req.params.dtranId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED SUCCESSFULLY");
  });
};

// export const updateTran = (req, res) => {
//   const q =
//     "UPDATE supplier_tran SET sup_tran_pay = ? , sup_tran_receive = ? , sup_tran_description = ? , sup_tran_date = ? , sup_balance = ? WHERE sup_tran_id = ?";
//   const values = [
//     req.body.sup_tran_pay,
//     req.body.sup_tran_receive,
//     req.body.sup_tran_description,
//     req.body.sup_tran_date,
//     req.body.sup_balance,
//     req.params.upTran,
//   ];
//   console.log(" values : ",values)
//   db.query(q, values, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json("UPDATED SUCCESSFULLY");
//   });
// };

export const fetchSupDataUsingId = (req, res) => {
  const q = "SELECT * from supplier_module where sup_id = ?";
  const sup_id = req.params.sup_id;
  db.query(q, [sup_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchSupLastTran = (req, res) => {
  const q = "SELECT * from supplier_tran where sup_tran_cnct_id = ? ORDER BY sup_tran_id DESC LIMIT 1";
  const values = req.params.sup_tran_cnct_id;
  db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
  });
};
