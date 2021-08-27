const connection = require("../config/dbConfig");

const Employee = function (employee) {
    this.emp_id = employee.emp_id;
    this.name = employee.name;
    this.contact_no = employee.contact_no;
    this.email = employee.email;
    this.address = employee.address;
    this.role = employee.role;
}

Employee.create = (newEmployee, result) => {
    connection.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newEmployee });
    })
}

Employee.findById = (employeeId, result) => {
    connection.query(`SELECT * FROM employee WHERE emp_id = "${employeeId}"`, (err, res) => {
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

Employee.getAll = result => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Employee.updateById = (id, employee, result) => {
    connection.query(
        "UPDATE employee SET name = ?, contact_no = ?, email = ?, address = ?, role = ? WHERE emp_id = ?",
        [employee.name, employee.contact_no, employee.email, employee.address, employee.role, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...employee });
        }
    );
};

Employee.remove = (id, result) => {
    connection.query("DELETE FROM employee WHERE emp_id = ?", id, (err, res) => {
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

module.exports = Employee;