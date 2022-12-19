module.exports = (app: any) => {
  const students = require("../controllers/student.controller");

  var router = require("express").Router();

  // Create a new Student
  router.post("/", students.create);

  // Retrieve all Students
  router.get("/", students.findAll);

  // Retrieve all graduated Students
  router.get("/graduated", students.findAllGraduated);

  // Retrieve a single Student with id
  router.get("/:id", students.findOne);

  // Update a Student with id
  router.put("/:id", students.update);

  // Delete a Student with id
  router.delete("/:id", students.delete);

  // Delete all Students
  router.delete("/", students.deleteAll);

  app.use("/api/students", router);
};
