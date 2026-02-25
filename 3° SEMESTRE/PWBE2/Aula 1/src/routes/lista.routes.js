const express = require("express");

const router = express.Router();

const listaControllers = require("../controllers/lista.controller")

router.get("/listar", listaControllers.listarItens);

module.exports = router;