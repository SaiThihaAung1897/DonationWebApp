module.exports = app => {
    const userDetails = require("../../controller/userDetails/userdetails.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", userDetails.create);
  
    // Retrieve all userId
    router.get("/userId", userDetails.findAll);
    
    // Retrieve a single Tutorial with id 
    router.get("/findOne/:userId", userDetails.findOne);
  
    // Update a Tutorial with id
    router.put("/update/:userId", userDetails.update);
  
    // Delete a Tutorial with id
    router.delete("/delete/:userId", userDetails.delete);
  
    // Delete all Tutorials
    router.delete("/deleteAll", userDetails.deleteAll);
  
    app.use('/api/userdetail/', router);
};