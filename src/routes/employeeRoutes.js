module.exports = app => {
    const employee = require("../controllers/employeeController");

    app.post("/employee", employee.create);
    app.get("/employee/all", employee.findAll);
    app.get("/employee", employee.findOne);
    app.put("/employee", employee.update);
    app.delete("/employee", employee.delete);
};