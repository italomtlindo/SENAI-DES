function salario(){
    let salario = Number(document.getElementById('salario').value);
    let resultado = document.getElementById('resultado');
    let bonus = 0;

       if(salario > 2000){
        bonus = salario * (10 / 100);
}

    let resultadoFinal = Number (salario + bonus);

    resultado.innerHTML = 
    ` Valor do salario final R$ ${bonus.toFixed(2)} <br>salario final R$ ${resultadoFinal.toFixed(2)}`;
};

/*--------------------------------------------------------------------------------------------*/

function fretou(){
    let compra = Number(document.getElementById('compra').value);
    let resultado = document.getElementById('resultado');
    let frete = 0;

       if(compra >= 150){
        frete = 0
}else{
    frete = 20
}

    let resultadoFinal = Number (compra + frete);

    resultado.innerHTML = 
    `frete de R$ ${frete.toFixed(2)} <br>valor final R$ ${resultadoFinal.toFixed(2)}`;
};

/*----------------------------------------------------------------------------------------------*/

function combustivel(){
    let abastecimento = Number(document.getElementById('abastecimento').value);
    let resultado = document.getElementById('resultado');
    let desconto = 0;

       if(abastecimento >= 200){
        desconto = abastecimento *(5 / 100);
}

    let resultadoFinal = Number (abastecimento + desconto);

    resultado.innerHTML = 
    `Valor do desconto é R$ ${desconto.toFixed(2)} <br>valor final R$ ${resultadoFinal.toFixed(2)}`;
};

/*----------------------------------------------------------------------------------------------*/

function taxadeserviço(){
    let serviço = Number(document.getElementById('serviço').value);
    let resultado = document.getElementById('resultado');
    let desconto = 0;

    if(serviço >= 100){
        desconto = serviço *(10 / 100);
    }

    let resultadoFinal = Number (serviço + desconto);

    resultado.innerHTML = 
    `Valor da taxa é R$ ${desconto.toFixed(2)} <br>valor final R$ ${resultadoFinal.toFixed(2)}`;
};

/*----------------------------------------------------------------------------------------------*/

function multaporatraso(){
    let mensalidade = Number(document.getElementById('mensalidade').value);
    let dias = Number(document.getElementById('dias').value);
    let resultado = document.getElementById('resultado');
    let multa = 0;

    if (dias > 0 ){
        multa = mensalidade *(2 / 100);
    }

    let resultadoFinal = Number (mensalidade + multa);
 
      resultado.innerHTML = 
    `Valor da multa é R$ ${multa.toFixed(2)} <br>valor final R$ ${resultadoFinal.toFixed(2)}`;
};

/*----------------------------------------------------------------------------------------------*/

function cashback(){
    let valor = Number(document.getElementById('cashback').value);
    let resultado = document.getElementById('resultado');
    let cashback = 0;

    if (valor >= 300) {
        cashback = valor *(5 / 100);
    }

    let resultadoFinal = Number (valor + cashback);

    resultado.innerHTML = 
    `Valor do cashback é R$ ${cashback.toFixed(2)} <br>valor final R$ ${resultadoFinal.toFixed(2)}`;
}