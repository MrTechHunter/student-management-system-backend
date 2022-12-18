module.exports = (sequelize: any, Sequelize: any) => {
  const Student = sequelize.define("student", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    grade: {
      type: Sequelize.STRING,
    },
    graduated: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Student;
};
