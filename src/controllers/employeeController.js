const Employee = require("../models/employeeModel");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const employee = new Employee({
        emp_id: req.body.emp_id,
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role,
    });

    Employee.create(employee, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Employee.findById(req.headers.emp_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.headers.emp_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with id " + req.headers.emp_id
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

    Employee.updateById(
        req.body.emp_id,
        new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Employee with id ${req.body.emp_id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Employee with id " + req.body.emp_id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Employee.remove(req.headers.emp_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with id ${req.headers.emp_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with id " + req.headers.emp_id
                });
            }
        } else res.send({ message: `Employee was deleted successfully!` });
    });
};