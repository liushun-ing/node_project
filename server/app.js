var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const UserRouter = require("./routes/admin/UserRouter");
const JWT = require("./util/JWT");
const CommonConstants = require("./util/CommonConstants");
const ResponseUtil = require("./util/ResponseUtil");
const NewsRouter = require("./routes/admin/NewsRouter");
const WebNewsRouter = require("./routes/web/NewsRouter");
const ProductRouter = require("./routes/admin/ProductRouter");
const WebProductRouter = require("./routes/web/ProductRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(WebNewsRouter);
app.use(WebProductRouter);

app.use((req, res, next) => {
  if (req.url === "/adminapi/user/login") {
    next();
    return;
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        CommonConstants.ExpireTime
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send(ResponseUtil.generateError(null, "token过去"));
    }
  }
});
app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);

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
