require("dotenv").config();

const express = require("express");
const cors = require("cors");

const carrosRoutes = require("./src/routes/carrosroutes");
const clientesRoutes = require("./src/routes/clientesroutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(carrosRoutes);
app.use(clientesRoutes);

app.get("/", (req, res) => {
    res.send("App Online").end();
});

app.listen(3000, () => {
    console.log("Online na 3000");
});