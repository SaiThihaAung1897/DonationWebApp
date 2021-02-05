module.exports = app => {
    const superAdmin = require("../../controller/superAdmin/superAdmin.controllers");

    var router = require("express").Router();

    router.post("/create", superAdmin.create);

    router.get("/getAll", superAdmin.findAll);

    router.get("/getName/:name", superAdmin.findOne)

    app.use("/api/superAdmin", router)
}