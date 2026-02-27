const express = require("express");

const router = express.Router();

const CarrosControllers = require("../controllers/carros.controllers");

router.post("/novocar", CarrosControllers.novoCarro);
router.get("/listarcarro", CarrosControllers.listarcarro);
router.get("/buscarcarro", CarrosControllers.buscarcarro);
router.delete("/deletarcarro", CarrosControllers.apagarcarro);
router.put("/atualizarcarro", CarrosControllers.atualizarcarro);

module.exports = router;