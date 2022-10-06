const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");

const TaskList = require("./database/models/taskList");
const Task = require("./database/models/task");

//cors cross origin request security..
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );

  // Pass to next layer of middleware
  next();
});
//middleware
app.use(express.json()); // or 3rd party body parser

//Routes of REST API endpoints or Restful webservices Endpoints
/* 
Tasklist - create , Update, ReadTaskListById, ReadAllTaskList
Task - create , Update, ReadTaskById, ReadAllTask

*/
//Routes or API endpoints for Tasklist model
//get all TaskList
//http://localhost:3000/tasklists => [{TaskList},{TaskList}]

app.get("/tasklists", (req, res) => {
  TaskList.find({})
    .then((lists) => {
      res.status(200);
      res.send(lists);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
});

//endpoint to get one tasklist by taskListId :
app.get("/tasklists/:tasklistId", (req, res) => {
  let tasklistId = req.params.tasklistId;
  TaskList.find({ _id: tasklistId })
    .then((taskList) => {
      res.status(200).send(taskList);
    })
    .catch((error) => {
      console.log(error);
    });
});

//route for endpoint for creating tasklist
app.post("/tasklists", (req, res) => {
  // console.log("Hello I am inside post method");
  console.log(req.body);
  let taskListObj = { title: req.body.title };
  TaskList(taskListObj)
    .save()
    .then((taskList) => {
      res.status(201);
      res.send(taskList);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
});

app.put("/tasklists/:tasklistId", (req, res) => {
  TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
    .then((taskList) => {
      res.status(200).send(taskList);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.patch("/tasklists/:tasklistId", (req, res) => {
  TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
    .then((taskList) => {
      res.status(200).send(taskList);
    })
    .catch((error) => {
      console.log(error);
    });
});

//delete a tasklist
app.delete("/tasklists/:tasklistId", (req, res) => {
  TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList) => {
      res.status(201).send(taskList);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
