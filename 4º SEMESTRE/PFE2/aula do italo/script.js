const botao = document.getElementById("botao"); //localiza o botao no html 

botao.addEventListener("click", function() { //funçao de clicar no botao 

    const cor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    
    //"const cor" cria a constante chamada cor
    //"Math.floor()" Arredonda o número para baixo, deixando ele inteiro.
    //"Math.random()" gera um número aleatorio entre 0 e 1
    //"* 16777215" multiplica esse numero aleatorio por 16.777.215, Porque as cores em hexadecimal podem representar valores de:000000 até FFFFFF, Isso representa aproximadamente 16,7 milhões de cores diferentes.
    //".toString(16)" Transforma o número em hexadecimal.

    document.body.style.backgroundColor = cor; // Muda o fundo para a cor escolhida

});

//------------- quero q quando vc clique no botao ele so mude para a cor vermelho, azul e amarelo ---------------

// const botao = document.getElementById("botao");

// const cores = ["red", "blue", "yellow"];

// botao.addEventListener("click", function() {

//     const numero = Math.floor(Math.random() * cores.length);

//     document.body.style.backgroundColor = cores[numero];

// });