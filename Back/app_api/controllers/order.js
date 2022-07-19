const formidable = require("formidable");
const OrderModel = require("../models/order");
const fs = require("fs");
const mineType = require("mime-types");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = function (req, res) {
  const searchObj = req.query || {};
  OrderModel.find(searchObj, function (err, pie) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Fetch faild!" },
      });

    sendJSONResponse(res, 200, { success: true, data: pie });
  });
};

module.exports.add = function (req, res, next) {
  let num = 0;
  let order;
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    order = new OrderModel({
      time: fields.time,
      // orderProductIdArr: fields.order,
      totalPrice: parseFloat(fields.totalPrice),
    });
    let idArr;
    idArr = fields.order.split(",");
    console.log(idArr);
    console.log(idArr.length);
    for (let index = 0; index < idArr.length; index++) {
      const element = idArr[index];
      order.orderProductIdArr.push(element);
    }
    // order.orderProductIdArr.push(fields.order);
    console.log("order.orderProductIdArr");
    console.log(order);
  });

  form.on("end", function (d) {
    num++;
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      order.save(function (err, savedOrder) {
        if (err) {
          sendJSONResponse(res, 500, {
            success: false,
            err: { msg: "Saving faild!" },
          });
          return;
        }
        sendJSONResponse(res, 201, { success: true, data: savedOrder });
      });
    }
  });
};

module.exports.getById = function (req, res) {
  OrderModel.findById(req.params.id, function (err, searchOrder) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Find product faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true, data: searchOrder });
  });
};
