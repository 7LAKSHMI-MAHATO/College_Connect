const express = require("express");

const app = express();

app.use(express.json());

const userRoutes = require("./routes/user.routes");
const noticeRoutes = require("./routes/notice.routes");

app.use("/api/auth", userRoutes);
app.use("/api/notices", noticeRoutes);


module.exports = app;