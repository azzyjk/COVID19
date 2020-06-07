var express = require("express");
var router = express.Router();
var fs = require("fs");

// const location = {
//   loc: [
//     "서울 관악구 시흥대로 552 석천빌딩 8층",
//     "대구 달서구 조암로 6길 6-45번지 대현빌딩3층",
//     "경기 부천시 신흥로 511번길 80",
//   ],
// };

var location = [];
location.push({ id: 1, loc: "test" });
/* GET users listing. */
router.get("/", function (req, res, next) {
  var data = fs.readFileSync("./info.txt", "utf-8");
  console.log(JSON.parse(data));
  console.log(location);
  res.json(location);
});

router.get("/:id", function (req, res, next) {
  user = location.find((u) => u.id === parseInt(req.params.id));
  res.send(user);
});

module.exports = router;
