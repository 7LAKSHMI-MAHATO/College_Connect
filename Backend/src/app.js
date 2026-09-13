const express = require("express");


const app = express();

app.use(express.json());

const userRoutes = require("./routes/user.routes");
const noticeRoutes = require("./routes/notice.routes");
const profileRoutes = require("./routes/profile.routes");
const complaintRoutes = require("./routes/complaint.routes");
const eventRoutes = require("./routes/event.routes");
app.use("/api/auth", userRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;