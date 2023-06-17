
const db = require("../models");
const Supplier = db.supplier;
const Op = db.Sequelize.Op;

// Create and Save a new Supplier
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a Supplier
  const supplier = {
    name: req.body.name,
    emailAddress: req.body.emailAddress,
    category: req.body.category,
    description: req.body.description
  };

  // Save Supplier in the database
  Supplier.create(supplier)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Supplier."
      });
    });
};

// Retrieve all Suppliers from the database.
exports.findAll = (req, res) => {
  Supplier.findAll(
    {
      order: [
      ['id', 'ASC'],
      ['name', 'ASC'],
    ]}
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving supplier."
      });
    });
};

// Find a single Supplier with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Supplier.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Supplier with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Supplier with id=${id}`
      });
    });
};

// Update a Supplier by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Supplier.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Supplier was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Supplier with id=" + id
      });
    });
};

// Delete a Supplier with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Supplier.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Supplier was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Supplier with id=" + id
      });
    });
};

// Delete all Suppliers from the database.
exports.deleteAll = (req, res) => {
  Supplier.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Supplier were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all suppliers."
      });
    });
};

// Find all published Suppliers
exports.findAllByCategory = (req, res) => {
  const category = req.params.category;
  var condition = category ? { category: { [Op.iLike]: `%${category}%` } } : null;

  Supplier.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving suppliers."
      });
    });
};