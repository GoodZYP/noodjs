var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const production = require("../sql/user");



/* GET home page. */
router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板

  production.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.render("user", {
      index: 2,
      data: data
    })
  })
});


//添加用户
router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

//提交
router.post("/addAction", function (req, res, next) {


  let obj = req.body;
  console.log(obj);

  //添加数据  通过node操作数据库
  production.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

});



//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  production.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

  // production.findOneAndRemove({'_id' : req.query._id},(err,data)=>{
  //    if(err) {
  //      console.log(err)
  //    }
  //    console.log(data)
  //    res.redirect("/pro");
  // })


  //   production.findOneAndDelete({'_id' : req.query._id},(err,data)=>{
  //     if(err) {
  //       console.log(err)
  //     }
  //     console.log(data)
  //     res.redirect("/pro");
  //  })

});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);


  production.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate', {
      index: 2,
      data: data
    })
  })


});

// 修改操作 -提交— 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  // obj.price = Number(obj.price);
  // obj.stock = parseFloat(obj.stock);
  // obj.discount = obj.discount - 0;
  // obj.sales = obj.sales - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id', obj)
  production.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");

  })
});


//商品搜索
router.get("/search", (req, res, next) => {
  console.log("用户搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  production.find({ userName: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    });
  })
});

module.exports = router;
