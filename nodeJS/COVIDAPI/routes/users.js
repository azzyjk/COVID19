var express = require("express");
var router = express.Router();

const users = [
  { id: 1, name: "nodejs" },
  { id: 2, name: "testing" },
  { id: 3, name: "hello" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(users);
});

router.get("/:id", function (req, res, next) {
  user = users.find((u) => u.id === parseInt(req.params.id));
  res.send(user);
});

module.exports = router;
