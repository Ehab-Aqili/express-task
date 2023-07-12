const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./router/users");

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/users", userRoutes);

app.listen(8080, () => {
  console.log("Server running at http://127.0.0.1:8080");
});
