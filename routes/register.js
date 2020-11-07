var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const production = require("../sql/user");

router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板
  res.render("register")
});

router.post("/in", function (req, res, next) {
  console.log('我进入in里面了');


  let obj = req.body;

  console.log(obj.userName);



  production.findOne({ userName: obj.userName }, (err, data) => {
    console.log('我进入查找了');

    if (err) {
      console.log(err)
    };

    if (data) {
      res.redirect("/register");
    } else {

      //添加数据  通过node操作数据库
      production.insertMany(obj, (err, data) => {

        if (err) {
          console.log(err)
        };

        if (data) {
          res.redirect("/login");
        } else {
          res.redirect("/register");
        }
      })


    }
  })


});


module.exports = router;