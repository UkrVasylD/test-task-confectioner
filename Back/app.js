var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var pieRouter = require("./app_api/routes/pie");
var orderRouter = require("./app_api/routes/order");
var usersRouter = require("./app_api/routes/users");

var app = express();

require("dotenv").config();
require("./db");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  req.publicDir = path.join(__dirname, "public");
  req.imagesDir = path.join(__dirname, "public");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
//-----------------
const { parseBearer } = require("./app_api/utils/token");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use((req, res, next) => {
  console.log("req.path");
  console.log(req.path);
  const closePathes = ["/order"];
  if (closePathes.includes(req.path)) {
    try {
      req.user = parseBearer(req.headers.authorization, req.headers);
    } catch (err) {
      return res.status(401).json({ result: "Access Denied" });
    }
  }
  next();
});
//----------------

app.use("/", indexRouter);
app.use("/pie", pieRouter);
app.use("/order", orderRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
