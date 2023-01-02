var Token = require("../models/token");
var user = require("../models/user");

module.exports = {
  confirmationGet: function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
      if (!token)
        return req
          .status(400)
          .send({ type: "not-verified", msg: "Token inválido" });
      user.findById(token._userId, function (err, user) {
       
        if (!user)
          return res.status(400).send({ msg: "user no encontrado" });
        if (user.verificado) return res.redirect("/users");
        user.verificado = true;
        user.save(function (err) {
          if (err) return res.status(500).send({ msg: err.message });
          res.redirect("/");
        });
      });
    });
  },
};
