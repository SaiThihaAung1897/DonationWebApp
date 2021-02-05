const db = require("../../models/superAdmin");
const superAdmin = db.superAdmin;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty"
        })
    }   

    const SuperAdmin = {
        name: req.body.name,
        email: req.body.email
    }

    superAdmin.create(SuperAdmin).
        then(data => {
            res.send(data)
        }).
        catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong"
            })
        });
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ? { name: { [Op.like] : `%${ name }%`} } : null;

    superAdmin.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the username"
            })
        })
}

exports.findOne = (req, res) => {
    const name = req.params.name;

    superAdmin.findOne({where: {name : name}})
        .then(data => {
            if(!data) {
                res.send({
                    message: `username ${name} not found.`
                });
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving userDetails with username = " + name
            });
        });
}