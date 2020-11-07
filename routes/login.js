var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const production = require("../sql/user");


router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板
  res.render("login")
});


router.post("/in", function (req, res, next) {
  console.log('我进入in里面了');


  let obj = req.body;

  console.log(obj);

  //添加数据  通过node操作数据库
  production.findOne({ userName: obj.userName, passWord: obj.passWord }, (err, data) => {

    if (err) {
      console.log(err)
    };

    if (data) {

      //response  服务器和你说 你的肚子里面 cookie那个位置 给我存上islogin = 0k
      // res.cookie('islogin', 'ok');

      //注意 这里是req 设置的 实在服务器端设置的 因为要先分裂成一个对象 给前端一个 后端藏一个  前端通过给的那一个加密的来找信息
      req.session.islogin = 'ok'

      res.redirect("/");
    } else {
      res.redirect("/register");
    }
  })

});


module.exports = router;