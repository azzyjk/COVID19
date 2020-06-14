var express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
var router = express.Router();

var url = {
  url:
    "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=12&ncvContSeq=&contSeq=&board_id=&gubun=",
  method: "GET",
  responseType: "arraybuffer",
  responseEncoding: "binary",
};

const getHtml = async () => {
  try {
    const response = await axios(url);
    const html = iconv.decode(response.data, "utf-8").toString();
    return html;
  } catch (error) {
    console.error(error);
  }
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  getHtml().then((html) => {
    var tdList = [];
    var COVIDLoc = [];
    var now = 0;
    const $ = cheerio.load(html);
    const $tbodyList = $("div.box_line2 table.midsize.big tbody tr td");

    $tbodyList.each(function (i, element) {
      tdList[i] = $(this)
        .text()
        .replace(/\(/g, "\n")
        .replace(/\)/g, "")
        .split("\n");
    });

    for (var i = 2; i < tdList.length; i += 5) {
      COVIDLoc[now] = {
        name: tdList[i][0],
        address: tdList[i][1],
        date: tdList[i + 1][0],
      };
      now++;
    }
    res.json(COVIDLoc);
    console.log(COVIDLoc);
  });
});
module.exports = router;
