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
exports.findAll = (req: any, res: any) => {
  const phoneNumber = req.query.phoneNumber;
  var condition = phoneNumber
    ? { phoneNumber: { [Op.like]: `%${phoneNumber}%` } }
    : null;

  Student.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};

// Find a single Student with an id
exports.findOne = (req: any, res: any) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req: any, res: any) => {
  const id = req.params.id;

  Student.update(req.body, {
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Error updating Student with id=" + id,
      });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req: any, res: any) => {
  const id = req.params.id;

  Student.destroy({
    where: { id: id },
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};

// Delete all Students from the database.
exports.deleteAll = (req: any, res: any) => {
  Student.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Students were deleted successfully!` });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Students.",
      });
    });
};

exports.findAllGraduated = (req: any, res: any) => {
  Student.findAll({ where: { graduated: true } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};
