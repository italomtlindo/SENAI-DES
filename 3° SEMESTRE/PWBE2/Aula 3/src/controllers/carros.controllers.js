const prisma = require("../data/prisma");

const novoCarro = async (req, res) => {
    try {
        let carro = req.body;

        
        if (!carro.placa) {
            return res.status(400).json({ erro: "placa obrigatoria" });
        }

        let placa = carro.placa.trim();
        placa = placa.toUpperCase();

        if (placa.includes(" ")) {
            return res.status(400).json({ erro: "placa nao pode ter espaço" });
        }

        if (placa.length !== 7) {
            return res.status(400).json({ erro: "Placa deve ter exatamente 7 caracteres" });
        }

        placa = placa.trim();

        const carrosExistentes = await prisma.carro.findMany();

        const placaExiste = carrosExistentes.some(c =>
            c.placa.toUpperCase() === placa.toUpperCase()
        );

        if (placaExiste) {
            return res.status(400).json({ erro: "Já existe um carro com essa placa" });
        }

        carro.placa = placa;


        if (!carro.codigo) {
            return res.status(400).json({ erro: "Código é obrigatório" });
        }

        let codigo = carro.codigo.toString();

        if (codigo.length !== 4) {
            return res.status(400).json({ erro: "Deve ter exatamente 4 dígitos" });
        }

        let temLetra = codigo
            .split("")
            .some(caractere => isNaN(caractere));

        if (temLetra) {
            return res.status(400).json({ erro: "Não pode conter letras" });
        }

        carro.codigo = codigo;


        const novoCarro = await prisma.carro.create({
            data: carro
        });

        return res.status(201).json(novoCarro);

    } catch (error) {
        return res.status(500).json({ erro: "Erro ao cadastrar carro" });
    }
};

const listarcarro = async (req, res) => {
    const carro = await prisma.carro.findMany();

    res.json(carro).status(200).end();
};

const buscarcarro = async (req, res) => {
    const { id } = req.params;

    const carro = await prisma.carro.findUnique({
        where: { id },
        include: {
            carro: true
        }
    });

    res.json(carro).status(200).end();
};

const apagarcarro = async (req, res) => {
    const { id } = req.params;

    const carro = await prisma.carro.delete({
        where: { id }
    });

    res.json(carro).status(200).end();
};

const atualizarcarro = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
     const carro = await prisma.turmas.update({
        where: { id },
        data: dados
    });

    res.json(carro).status(200).end();
};

module.exports = {
    novoCarro,
    listarcarro,
    buscarcarro,
    apagarcarro,
    atualizarcarro
}