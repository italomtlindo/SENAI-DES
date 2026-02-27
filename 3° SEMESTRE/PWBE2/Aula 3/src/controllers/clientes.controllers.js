const prisma = require("../data/prisma");

const novocliente = async (req, res) => {

    try {

        const { nome, cpf, email, cnh } = req.body;

        if ([nome, cpf, email, cnh].some(campo => !campo)) {
            return res.status(400).json({
                erro: "todos os campos são obrigatorios"
            });
        }

        const nomeTratado = nome.trim();
        const quantidadePalavras = nomeTratado.split(/\s+/);

        if (quantidadePalavras.length < 2) {
            return res.status(400).json({
                erro: "nome tem q ter pelo menos 2 palavras"
            });
        }

        const cpfLimpo = String(cpf).replace(/\D/g, "");

        if (!/^\d+$/.test(cpfLimpo)) {
            return res.status(400).json({
                erro: "cpf nao pd ter letra"
            });
        }

        if (cpfLimpo.length !== 11) {
            return res.status(400).json({
                erro: "cpf tem que ter 11 caracteres"
            });
        }

        const emailFormatado = email.trim().toLowerCase();

        const emailValido =
            emailFormatado.includes("@") &&
            emailFormatado.includes(".");

        if (!emailValido) {
            return res.status(400).json({
                erro: "email invalido"
            });
        }

        const clienteExistente = await prisma.clientes.findMany({
            where: {
                email: {
                    equals: emailFormatado,
                    mode: "insensitive"
                }
            }
        });

        if (clienteExistente.length > 0) {
            return res.status(400).json({
                erro: "Ja existe esse email"
            });
        }

        if (!/^\d/.test(cnh)) {
            return res.status(400).json({
                erro: "CNH deve começar com número"
            });
        }

        const resultado = await prisma.clientes.create({
            data: {
                nome: nomeTratado,
                cpf: cpfLimpo,
                email: emailFormatado,
                cnh: cnh
            }
        });

        return res.status(201).json(resultado);

    } catch (err) {

        console.error("Erro ao registrar cliente:", err);

        return res.status(500).json({
            erro: "Erro interno"
        });
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