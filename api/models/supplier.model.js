module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define("supplier", {
    name: {
      type: Sequelize.STRING
    },
    emailAddress: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING // Sequelize.ENUM("Services", "Sub-contractors, "Manufacturers", "Distributors" and "Importers")
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Supplier;
};