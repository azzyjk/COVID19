var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var data = fs.readFileSync("./location.json", "utf-8");
  fs.readFile("./location.json", "utf-8", (err, data) => {
    var parsedData = JSON.parse(data);
    res.json(parsedData);
  });
});

router.get("/:id", function (req, res, next) {
  user = location.find((u) => u.id === parseInt(req.params.id));
  res.send(user);
});

module.exports = router;
