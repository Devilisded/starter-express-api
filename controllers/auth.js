import { transporter } from "../nodemailer.js";
import { db } from "../connect.js";
export const sendOtp = (req, res) => {
  var otp = Math.floor(100000 + Math.random() * 900000);
  const info = {
    from: '"Foo Faa 👻" <rakshita.mathexpert@gmail.com>', // sender address
    to: req.params.email, // list of receivers
    subject: "Hello ✔", // Subject line
    html: `Otp is <b>${otp}</b> and you can use this to login into our system`, // html body
  };
  transporter.sendMail(info, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(otp);
  });
};

export const login = (req, res) => {
  const q = "SELECT * from login_module WHERE log_email = ?";
  db.query(q, req.body.inputs, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      const q = "INSERT INTO login_module (log_email) Value (?)";
      db.query(q, req.body.inputs, (err, data) => {
        if (err) return res.status(500).json(err);
        const q = "SELECT * from login_module WHERE log_id = ?";
        db.query(q, data.insertId, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      });
    }
  });
};
