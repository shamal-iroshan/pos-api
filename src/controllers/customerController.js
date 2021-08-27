const Customer = require("../models/customerModel");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const customer = new Customer({
        customer_id: req.body.customer_id,
        name: req.body.name,
        contact_no: req.body.contact_no,
        address: req.body.address,
        state: req.body.state,
    });

    Customer.create(customer, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Customer.findById(req.headers.customer_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.headers.customer_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.headers.customer_id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.body.customer_id,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.body.customer_id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.body.customer_id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Customer.remove(req.headers.customer_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.headers.customer_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.headers.customer_id
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};