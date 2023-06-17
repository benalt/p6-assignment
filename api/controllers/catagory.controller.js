// Retrieve all Suppliers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  // mock table
  var data = [
    { key: "services",        label : "Services" },
    { key: "subcontractors",  label : "Sub-contractors"},
    { key: "manufacturers",   label : "Manufacturers"},
    { key: "distributors",    label : "Distributors"},
    { key: "importers",       label : "Importers"},
  ]

  res.send(data);
  
};