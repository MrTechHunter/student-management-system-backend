const database = require("../models");
const Student = database.students;
const Op = database.Sequelize.Op;

// Create and Save a new Student
exports.create = (req: any, res: any) => {
  // Validate request
  if (!req.body.firstName && !req.body.lastName && !req.body.phoneNumber) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Student
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    grade: req.body.grade,
    graduated: req.body.graduated ? req.body.graduated : false,
  };

  // Save Student in the database
  Student.create(student)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

// Retrieve all Students from the database.
exports.findAll = (req: any, res: any) => {};

// Find a single Student with an id
exports.findOne = (req: any, res: any) => {};

// Update a Student by the id in the request
exports.update = (req: any, res: any) => {};

// Delete a Student with the specified id in the request
exports.delete = (req: any, res: any) => {};

// Delete all Students from the database.
exports.deleteAll = (req: any, res: any) => {};

// Find all graduated Students
exports.findAllPublished = (req: any, res: any) => {};
