const express = require("express");
const app = express();
const dir = `${__dirname}/public/`;

app.get("*", (req, res) => {
    res.sendFile(dir + "index.html");
});

app.listen(3000);