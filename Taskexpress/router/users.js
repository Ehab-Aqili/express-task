const express = require("express");
const routes = express.Router();
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("Data.json"));

routes.get("/", (req, res) => {
  res.send("your port is running on port 8080");
});

routes.get("/users", (req, res) => {
  res.send(data);
});

routes.get("/:id", (req, res) => {
  const id = req.params.id * 1;
  let DataWithId = data.find((el) => el.index === id);
  console.log(DataWithId);
  res.send(DataWithId);
});

routes.post("/user/create", (req, res) => {
  const newIndex = data[data.length - 1].index + 1;
  const newData = Object.assign({ index: newIndex }, req.body);
  data.push(newData);
  fs.writeFile("./Data.json", JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(data);
    }
  });
  res.send("done");
});

routes.patch("/users/:id/create", (req, res) => {
  let id = req.params.id * 1;
  let updateData = data.find((el) => el.index === id);
  if (!updateData) {
    return res.status(404).json({
      status: "fail",
      message: "No Data objects with ID:" + id + "is found",
    });
  }
  let index = data.indexOf(updateData);
  Object.assign(updateData, req.body);
  data[index] = updateData;
  fs.writeFile("Data.json", JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(data);
    }
  });
});

routes.delete("/users/:id/delete", (req, res) => {
  let id = req.params.id * 1;
  let updateData = data.find((el) => el.index === id);
  if (!updateData) {
    return res.status(404).json({
      status: "fail",
      message: "No Data objects with ID:" + id + "To delete",
    });
  }
  let index = data.indexOf(updateData);
  data.splice(index, 1);
  fs.writeFile("Data.json", JSON.stringify(data), (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(data);
    }
  });
});

module.exports = routes;
