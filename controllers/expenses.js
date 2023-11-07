import { db } from "../connect.js";

export const fetchExpenseCategory = (req, res) => {
  const q = "SELECT * from expense_category";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchExpenseList = (req, res) => {
  const q = "SELECT * from expense_list";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addExpenseCategory = (req, res) => {
  const q = "INSERT INTO expense_category (`category_name`) VALUES(?)";
  const values = [req.body.category_name];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Transaction has been Entered");
  });
};

export const addExpenseList = (req, res) => {
  const q = "INSERT INTO expense_list (`expense_name`,`price`) VALUES(?)";
  const values = [req.body.expense_name, req.body.price];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Transaction has been Entered");
  });
};

export const delExpenseItemFromList = (req, res) => {
  const q = "DELETE expense_list from expense_list where id = ?";
  db.query(q, [req.params.eiid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted SuccessFully");
  });
};

export const updateExpenseItemData = (req, res) => {
  const q = "UPDATE expense_list SET expense_name = ? ,price = ? where id = ?";
  const values = [req.body.expense_name, req.body.price, req.params.eiid];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const delExpenseCategory = (req, res) => {
  const q = "DELETE expense_category from expense_category where id = ?";
  db.query(q, [req.params.ecid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted SuccessFully");
  });
};

export const updateExpenseCategoryData = (req, res) => {
  const q = "UPDATE expense_category SET category_name = ? where id = ?";
  const values = [req.body.category_name, req.params.ecid];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const addExpenses = (req, res) => {
  let id = 0;
  const q =
    "INSERT INTO expenses_module ( `exp_prefix`, `exp_prefix_no` , `exp_date`, `exp_category`, `exp_total`) Values (?)";
  const values = [
    req.body.prefix_name,
    req.body.prefix_no,
    req.body.expense_date,
    req.body.category_name,
    req.body.amount_paid,
    
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const id1 = data.insertId;
    const q =
      "INSERT into cashbook_module(`cash_date`,`cash_description`,`cash_pay`,`cash_mode`) VALUES(?)";
    const values = [
      req.body.expense_date,
      req.body.category_name,
      req.body.amount_paid,
      data.insertId,
    ];
    db.query(q, [values], (err, data) => {
      if (err) throw err;
      if (err) return res.status(500).json(err);

      const q2 =
        "INSERT INTO expenses_tran ( `cnct_id`, `exp_item_name`, `exp_item_qty`, `exp_item_price`) Values ?";

      const values2 = req.body.list.map((values) => [
        id1,
        values.expense_name,
        values.qty,
        values.price,
      ]);

      db.query(q2, [values2], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Done");
      });
    });
  });
};

export const fetchExpensesData = (req, res) => {
  const q = "SELECT * from expenses_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchExpensesPrefixData = (req, res) => {
  const q =
    "select distinct exp_prefix , max(exp_prefix_no) as prefix_no from accbook.expenses_module group by exp_prefix ORDER By exp_prefix = 'Expenses' DESC ;";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchExpensesTran = (req, res) => {
  const q = "SELECT * from expenses_module where exp_id = ?";
  db.query(q, req.params.expId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchExpensesRightTran = (req, res) => {
  const q = "SELECT * from expenses_tran where cnct_id = ?";
  db.query(q, req.params.expId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const delexpenses = (req, res) => {
  const q =
    "DELETE expenses_module.*,expenses_tran.*,cashbook_module.* from expenses_module LEFT JOIN expenses_tran ON expenses_module.exp_id = expenses_tran.cnct_id LEFT JOIN cashbook_module ON expenses_module.exp_id = CAST(cashbook_module.cash_mode as SIGNED) where expenses_module.exp_id = ?;"
  db.query(q, [req.params.expId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted SuccessFully");
  });
};

export const fetchExpensesUserAddedItemList = (req, res) => {
  const q = "SELECT exp_tran_id * 5 + 6 as id , exp_item_name , exp_item_qty , exp_item_price FROM expenses_tran WHERE cnct_id = ? union SELECT id * 15 + 16 , expense_name , qty , price FROM expense_list WHERE expense_name NOT IN (SELECT exp_item_name FROM expenses_tran WHERE cnct_id = ? );"
  const values = [
    req.params.cnct_Id1,
    req.params.cnct_Id2,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const DeleteExpensesUserAddedItemList = (req, res) => {
  const q = "DELETE from expenses_tran where cnct_id = ?"
  db.query(q, req.params.expId, (err, data) => {
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


export const UpdateExpensesUserAddedItemList = (req, res) => {
   
  console.log("req : ", req.body);
  const values = [
    req.body.list,
    //req.body.expId,
  ];
  console.log("req : ", req.body.list);
    const q =
      "INSERT INTO expenses_tran ( `cnct_id`, `exp_item_name`, `exp_item_qty`, `exp_item_price`) Values ?";

    const values2 = req.body.list.map((values) => [
      values.id,
      values.expense_name,
      values.qty,
      values.price,
    ]);
    console.log("values2 :" , values)
    db.query(q, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Data has been entered");
    });
}
