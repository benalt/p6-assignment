module.exports = app => {
  const categories = require("../controllers/catagory.controller");

  var router = require("express").Router();

  // Retrieve all Suppliers
  router.get("/", categories.findAll);
  
  app.use('/api/categories', router);
};