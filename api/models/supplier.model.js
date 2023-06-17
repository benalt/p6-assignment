module.exports = (sequelize, Sequelize) => {
  const Supplier = sequelize.define("supplier", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull:true
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        is: /[\w-]+@([\w-]+\.)+[\w-]+/ // super basic email validator that probably needs to be more intese
      }
      
    },
    category: {
      type: Sequelize.ENUM("services", "subcontractors", "manufacturers", "distributors", "importers"),
      allowNull: false,
      validate: {
        notNull:true
      }
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  return Supplier;
};