const express = require("express");

const router = express.Router();

const clientesControllers = require("../controllers/clientes.controllers");

router.post("/novocliente", clientesControllers.novocliente);
router.get("/listarcliente", clientesControllers.listarcliente);
router.get("/buscarcliente", clientesControllers.buscarcliente);
router.delete("/deletarcliente", clientesControllers.apagarcliente);
router.put("/atualizarcliente", clientesControllers.atualizarcliente);

module.exports = router;