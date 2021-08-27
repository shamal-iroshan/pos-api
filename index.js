const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World");
});

require("./src/routes/employeeRoutes")(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});