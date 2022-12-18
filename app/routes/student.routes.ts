module.exports = (app: any) => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();

  // Create a new student
  router.post("/", students.create);

  app.use("/api/students", router);
};
