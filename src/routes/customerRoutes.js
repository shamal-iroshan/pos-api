module.exports = app => {
    const customer = require("../controllers/customerController");

    app.post("/customer", customer.create);
    app.get("/customer/all", customer.findAll);
    app.get("/customer", customer.findOne);
    app.put("/customer", customer.update);
    app.delete("/customer", customer.delete);
};