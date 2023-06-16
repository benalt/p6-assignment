module.exports = app => {
  const supplier = require("../controllers/supplier.controller");

  var router = require("express").Router();

  // Create a new Supplier
  router.post("/", supplier.create);

  // Retrieve all Suppliers
  router.get("/", supplier.findAll);

  // Retrieve all published suppliers
  router.get("/category/:category", supplier.findAllByCategory);

  // Retrieve a single Supplier with id
  router.get("/:id", supplier.findOne);

  // Update a Supplier with id
  router.put("/:id", supplier.update);

  // Delete a Supplier with id
  router.delete("/:id", supplier.delete);


  app.use('/api/suppliers', router);
};