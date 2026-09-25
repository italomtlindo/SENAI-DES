const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
  try {
    const { nome, descricao, categoria, imagem, preco} = req.body;

    const item = await prisma.produto.create({
      data: {
        nome,
        descricao,
        categoria,
        imagem: imagem,
        preco,
      },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar produto." });
  }
};

const listar = async (req, res) => {
    try {
        const lista = await prisma.produto.findMany();

        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar produtos." });
    }
};

const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.produto.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produto." });
    }
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.produto.update({
            where: { id: Number(id) },
            data: dados
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.produto.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir produto." });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};