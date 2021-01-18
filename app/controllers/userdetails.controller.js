const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.userId){
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    const tutorial = {
        userId: req.body.userId,
        name: req.body.name,
        mail: req.body.mail,
        orgId: req.body.orgId,
        orgName: req.body.orgName
    }

    Tutorial.create(tutorial)
        .then(data => 
            res.send(data)
        )
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}   

exports.update = (req, res) => {
    const userId = req.params.userId;

    Tutorial.update(req.body, {
        where: { userId: userId }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Tutorial was updated successfully"
            })
        }else{
            res.send({
                message: `Cannot update Tutorial with userId=${userId}. Maybe Tutorial was not found or req.body is empty!`
            })
        }
    })
}

exports.findAll = (req, res) => {
    const userId = req.query.userId;
    const condition = userId ? { userId: { [Op.like] : `%${ userId }%`} } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the userId"
            })
        })
}

exports.findOne = (req, res) => {
    const autoId = req.params.autoId;

    Tutorial.findByPk(autoId)
        .then(data => {
            if(!data) {
                res.send({
                    message: "Id not found."
                });
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Tutorial with autoId = " + autoId
            });
        });
}

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Tutorials were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
        });
    });
}

exports.delete = (req, res) => {
    const userId = req.params.userId;

    Tutorial.destroy({
        where: {userId},
        truncate: false
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        }else{
            res.send({
                message: `Cannot delete Tutorial with userId=${userId}. Maybe Tutorial was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete Tutorial with userId=" + userId
        });
    });
}