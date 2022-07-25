const formidable = require("formidable");
const PieModel = require("../models/pie");
const fs = require("fs");
const mineType = require("mime-types");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = function (req, res) {
  const searchObj = req.query || {};
  // Search to price
  if (searchObj.minPrice || searchObj.maxPrice) {
    searchObj.price = {
      $gte: req.query.minPrice || 0,
      $lte: req.query.maxPrice || Infinity,
    };
  }
  if (searchObj.title) {
    searchObj.title = { $regex: searchObj.title };
  }
  PieModel.find(searchObj)
    // find({ title: { $regex: searchObj.title} }).
    .limit(6)
    .select("-description")
    .sort({ price: searchObj.sortPrice })
    .sort({ title: searchObj.sortTitle })
    .exec(function (err, pie) {
      if (err)
        return sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Fetch faild!" },
        });
      // Converted photo with static folder public to base64
      pie.forEach((item) => {
        let path = req.imagesDir + item.photo;
        var photoBase64 = imgToBase64(path);

        function imgToBase64(url) {
          var dataurl = fs.readFileSync(url);
          return dataurl.toString("base64");
        }
        let base64 = "data:" + mineType.lookup(path) + ";base64," + photoBase64;
        item.photo = base64;
      });

      sendJSONResponse(res, 200, { success: true, data: pie });
    });
};

module.exports.add = function (req, res, next) {
  let num = 0;
  let pie;
  const form = formidable({ multiples: true });
  form
    .parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      pie = new PieModel({
        category: fields.category,
        title: fields.title,
        type: fields.type,
        description: fields.description,
        price: parseFloat(fields.price),
        photo: "/images/" + files.photo.originalFilename,
      });
    })
    .on("fileBegin", function (name, file) {
      file.filepath = req.imagesDir + "/images/" + "\\" + file.originalFilename;
    });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      pie.save(function (err, savedPie) {
        if (err) {
          sendJSONResponse(res, 500, {
            success: false,
            err: { msg: "Saving faild!" },
          });
          return;
        }
        sendJSONResponse(res, 201, { success: true, data: savedPie });
      });
    }
  });
};

module.exports.delete = function (req, res) {
  if (req.body && req.body.id) {
    PieModel.findByIdAndDelete(req.body.id, function (err) {
      if (err) {
        sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Delete faild!" },
        });
        return;
      }
      sendJSONResponse(res, 204, { success: true });
    });
  } else {
    sendJSONResponse(res, 404, {
      success: false,
      massage: "No product id in request!",
    });
  }
};

module.exports.update = function (req, res, next) {
  let num = 0;
  let product;
  const form = formidable({ multiples: true });
  form
    .parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      product = {
        category: fields.category,
        title: fields.title,
        type: fields.type,
        description: fields.description,
        price: parseFloat(fields.price),
      };
      req.body.id = fields._id;
      req.body.product = product;
      if (files.photo.originalFilename) {
        product.photo = "/images/" + files.photo.originalFilename;
      }
    })
    .on("fileBegin", function (name, file) {
      file.filepath = req.imagesDir + "/images/" + "\\" + file.originalFilename;
    });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      PieModel.findByIdAndUpdate(
        req.body.id,
        req.body.product,
        { new: true },
        function (err) {
          // mongoose.disconnect()
          if (err) {
            sendJSONResponse(res, 500, {
              success: false,
              err: { msg: "Update faild!" },
            });
            return;
          }

          sendJSONResponse(res, 200, { success: true });
        }
      );
    }
  });
};

module.exports.getById = function (req, res) {
  if (req.params && req.params.id) {
    PieModel.findById(req.params.id, function (err, searchProduct) {
      if (!searchProduct) {
        sendJSONResponse(res, 404, {
          success: false,
          massage: "Product not found!",
        });
        return;
      } else if (err) {
        sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Find product faild!" },
        });
        return;
      }
      // Converted photo with static folder public to base64
      let path = req.imagesDir + searchProduct.photo;
      var photoBase64 = imgToBase64(path);

      function imgToBase64(url) {
        var dataurl = fs.readFileSync(url);
        return dataurl.toString("base64");
      }
      let base64 = "data:" + mineType.lookup(path) + ";base64," + photoBase64;
      searchProduct.photo = base64;
      sendJSONResponse(res, 200, { success: true, data: searchProduct });
    });
  } else {
    sendJSONResponse(res, 404, {
      success: false,
      massage: "No product id in request!",
    });
  }
};
