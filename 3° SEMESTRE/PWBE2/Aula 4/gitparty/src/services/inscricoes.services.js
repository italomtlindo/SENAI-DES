const prisma = require("../data/prisma");

const limiteParticipantes = async (usuarioId, eventoId) => {
    const evento = await prisma.eventos.findUnique({
        where: { id : eventoId },
        include: {
            Inscricoes: true
        }
    });

    const numeroParticipantes = evento.Inscricoes.filter(inscricao => inscricao.status === "CONFIRMADA").length;

    console.log(numeroParticipantes);
};

module.exports = {
    limiteParticipantes
}