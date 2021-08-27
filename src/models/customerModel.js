const connection = require("../config/dbConfig");

const Customer = function (customer) {
    this.customer_id = customer.customer_id;
    this.name = customer.name;
    this.contact_no = customer.contact_no;
    this.address = customer.address;
    this.state = customer.state;
}

Customer.create = (newCustomer, result) => {
    connection.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newCustomer });
    })
}

Customer.findById = (customerId, result) => {
    connection.query(`SELECT * FROM customer WHERE customer_id = "${customerId}"`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Customer.getAll = result => {
    connection.query("SELECT * FROM customer", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    connection.query(
        "UPDATE customer SET name = ?, contact_no = ?, address = ?, state = ? WHERE customer_id = ?",
        [customer.name, customer.contact_no, customer.address, customer.state, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...customer });
        }
    );
};

Customer.remove = (id, result) => {
    connection.query("UPDATE customer SET state = 'DELETED' WHERE customer_id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Customer;