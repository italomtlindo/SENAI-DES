const prisma = require("../data/prisma");

const novoCarro = async (req, res) => {
    try {
        const carro = req.body;

        let placa = carro.placa;
        if (!placa) {
            return res.status(401).json
            ({ erro: "placa obrigatoria!!!" });
        }

        placa = placa.trim();
        if (placa.length === 0) {
            return res.status(401).json
            ({ erro: "placa tem que estar preenchida!!!" });
        }

        if (placa.includes(" ")) {
            return res.status(401).json
            ({ erro: "placa nao pode ter espao!!!" });
        }

        if (placa.length !== 7) {
            return res.status(401).json
            ({ erro: "placa deve ter 7 caracteres!!!" });
        }

        if (placa.includes("-")) {
            return res.status(401).json
            ({Erro: "placa nao pode ter traçoe!!!"});
        }

        placa = placa.toUpperCase();
        const crepetido = await prisma.carros.findMany();

        const prepetida = crepetido.some(c =>
            c.placa.toUpperCase() === placa
        );

        if (prepetida) {
            return res.status(401).json({ erro: "placa ja usada" });
        }

        /*--------------------------------------------------------------------------------------------------*/

        let maremod = carro.modelo && carro.marca;
        maremod = maremod.trim();
        if (maremod === "") {
            return res.status(400).json
            ({ erro: "marca e modelo nao pode estar fazio!!!" });
        };

        /*-----------------------------------------------------------------------------------------------------*/

        let ano = carro.ano;

        if ((ano + "").length !== 4) {
            return res.status(401).json
            ({ erro: "ano deve ter 4 caracteres" });
        };

        const ncarro = await prisma.carros.create({
            data: carro
        });
        return res.status(201).json(ncarro);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro" });
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