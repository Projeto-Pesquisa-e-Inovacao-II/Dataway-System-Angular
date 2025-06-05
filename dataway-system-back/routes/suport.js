var express = require("express");
var router = express.Router();

var suportController = require("../controllers/suportController");

router.post("/", function (req, res) {
  
    suportController.sendEmail(req, res);
});

module.exports = router;
