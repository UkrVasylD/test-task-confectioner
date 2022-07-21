const UsersModel = require("../models/users");
const { prepareToken } = require("../utils/token");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = function (req, res) {
  UsersModel.find({})
    .select("_id name")
    .exec(function (err, users) {
      if (err)
        return sendJSONResponse(res, 500, {
          success: false,
          err: { msg: "Fetch faild!" },
        });

      sendJSONResponse(res, 200, { success: true, data: users });
    });
};

module.exports.signup = function (req, res) {
  var user = new UsersModel({
    email: req.body.email,
    name: req.body.name,
    type: "user",
  });
  console.log(user);
  user.setPassword(req.body.password);
  user
    .save()
    .then((user) => {
      const token = prepareToken(
        {
          id: user._id,
          name: user.name,
        },
        req.headers
      );
      return res.status(201).json({
        result: "Signuped successfully",
        token,
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Signup error" });
    });
};

module.exports.login = function (req, res) {
  if (!req.body.email) {
    return res.status(401).json({ error: "Email is required" });
  }
  if (!req.body.password) {
    return res.status(401).json({ error: "Password is required" });
  }
  UsersModel.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({ error: "Login error" });
      }
      const token = prepareToken(
        {
          id: user._id,
          name: user.name,
        },
        req.headers
      );
      const expiresAt = new Date().getTime() + 36000000;
      res.status(200).json({
        result: "Authorized",
        user: {
          authData: {
            _id: user._id,
            name: user._doc.name,
            type: user.type,
            access_token: token,
          },
          expiresAt,
        },
      });
    })
    .catch((err) => {
      return res.status(401).json({ error: "Login error" });
    });
};

module.exports.update = function (req, res, next) {
  // let num = 0;
  let favoriteList = [];
  console.log("req.body");
  console.log(req.body);
  console.log(req.body.favoriteListId.length);

  for (let index = 0; index < req.body.favoriteListId.length; index++) {
    const _id = req.body.favoriteListId[index];
    console.log(_id);
    console.log(req.body.favoriteListId[index]);

    favoriteList.push({ _id: _id });
    console.log(favoriteList);
  }
  console.log("favoriteList");
  console.log(favoriteList);
  console.log(req.body.userId);
  // const form = formidable({ multiples: true });
  // form
  //   .parse(req, (err, fields, files) => {
  //     if (err) {
  //       next(err);
  //       return;
  //     }
  //     user = {
  //       favoriteList: fields.favoriteList,
  //     };
  //     req.body.id = fields._id;
  //     req.body.user = user;
  //   })
  //   .on("fileBegin", function (name, file) {
  //     file.filepath = req.imagesDir + "/images/" + "\\" + file.originalFilename;
  //   });

  // form.on("end", function (d) {
  //   num++;
  //   if (num == 1) {
  //     //Збереження моделі і відключення від бази даних
  UsersModel.findByIdAndUpdate(
    req.body.userId,
    {
      favoriteList: favoriteList,
    },

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
};
//   });
// };
