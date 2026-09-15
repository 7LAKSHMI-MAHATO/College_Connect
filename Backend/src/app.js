const express = require("express");


const app = express();

app.use(express.json());

const userRoutes = require("./routes/user.routes");
const noticeRoutes = require("./routes/notice.routes");
const profileRoutes = require("./routes/profile.routes");
const complaintRoutes = require("./routes/complaint.routes");
const eventRoutes = require("./routes/event.routes");
const resourceRoutes = require("./routes/resource.routes");
const requestRoutes = require("./routes/request.routes");
const adminRoutes = require("./routes/admin.routes");
app.use("/api/auth", userRoutes);

app.use("/api/notices", noticeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;