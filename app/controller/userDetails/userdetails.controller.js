const db = require('../../models/userDetails');
const userDetails = db.userDetails;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    const UserDetails = {
        userId: req.body.userId,
        name: req.body.name,
        mail: req.body.mail,
        orgId: req.body.orgId,
        orgName: req.body.orgName
    }

    userDetails.create(UserDetails)
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

    userDetails.update(req.body, {
        where: { userId: userId }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: `userId ${userId} was updated successfully`
            })
        }else{
            res.send({
                message: `Cannot update userDetails with userId=${userId}. Maybe userDetails was not found or req.body is empty!`
            })
        }
    })
}

exports.findAll = (req, res) => {
    const userId = req.query.userId;
    const condition = userId ? { userId: { [Op.like] : `%${ userId }%`} } : null;

    userDetails.findAll({ where: condition })
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
    const userId = req.params.userId;

    userDetails.findOne({where: {userId : userId}})
        .then(data => {
            if(!data) {
                res.send({
                    message: `userId ${userId} not found.`
                });
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving userDetails with userId = " + userId
            });
        });
}

exports.deleteAll = (req, res) => {
    userDetails.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} userDetails were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all userDetails."
        });
    });
}

exports.delete = (req, res) => {
    const userId = req.params.userId;

    userDetails.destroy({
        where: {userId},
        truncate: false
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: `userId ${userId} was deleted successfully!`
            });
        }else{
            res.send({
                message: `Cannot delete userDetails with userId=${userId}. Maybe userDetails was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Could not delete userDetails with userId=" + userId
        });
    });
}

