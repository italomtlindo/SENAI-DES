const prisma = require("../data/prisma");

const novocliente = async (req, res) => {
    try {
        let cliente = req.body;



        if (!cliente.nome) {
            return res.status(400).json({ erro: "nome obrigatorio" });
        }

        let nome = cliente.nome.trim();

        if (nome.length === 0) {
            return res.status(400).json({ erro: "nome nao pode tar vazio" });
        }

        let palavras = nome.split(" ").filter(p => p.trim().length > 0);

        if (palavras.length < 2) {
            return res.status(400).json({ erro: "O nome deve conter pelo menos duas palavras" });
        }

        cliente.nome = nome;



        if (!cliente.cpf) {
            return res.status(400).json({ erro: "CPF é obrigatorio" });
        }

        cpf = cpf.trim()

        if (cpf.length !== 11) {
            return res.status(400).json({ erro: "cpf deve conter exatamente 11 números" });
        }

        cliente.cpf = cpf;



        if (!cliente.email) {
            return res.status(400).json({ erro: "email obrigatorio" });
        }

        let email = cliente.email.toLowerCase();

        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ erro: "Email inválido" });
        }

        const clientesExistentes = await prisma.cliente.findMany();

        const emailExiste = clientesExistentes.some(c => 
            c.email === email
        );

        if (emailExiste) {
            return res.status(400).json({ erro: "Já existe um cliente com esse email" });
        }

        cliente.email = email;



        if (!cliente.cnh) {
            return res.status(400).json({ erro: "CNH é obrigatória" });
        }

        let caracteres = cliente.cnh.split("");

        let primeiroCaractere = caracteres[0];

        if (isNaN(primeiroCaractere)) {
            return res.status(400).json({ erro: "A CNH deve começar com número" });
        }


        const novoCliente = await prisma.cliente.create({
            data: cliente
        });

        return res.status(201).json(novoCliente);

    } catch (error) {
        return res.status(500).json({ erro: "Erro ao cadastrar cliente" });
    }
};

const listarcliente = async (req, res) => {
    const cliente = await prisma.cliente.findMany();

    res.json(cliente).status(200).end();
};

const buscarcliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await prisma.cliente.findUnique({
        where: { id },
        include: {
            cliente: true
        }
    });

    res.json(cliente).status(200).end();
};

const apagarcliente = async (req, res) => {
    const { id } = req.params;

    const ciente = await prisma.ciente.delete({
        where: { id }
    });

    res.json(ciente).status(200).end();
};

const atualizarcliente = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
     const cliente = await prisma.turmas.update({
        where: { id },
        data: dados
    });

    res.json(cliente).status(200).end();
};

module.exports = {
    novocliente,
    listarcliente,
    buscarcliente,
    apagarcliente,
    atualizarcliente
}