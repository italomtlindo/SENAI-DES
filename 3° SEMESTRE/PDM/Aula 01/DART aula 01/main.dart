void main(){
    String texto = "AlÔ mundo!";
    int numero = 99999999888;
    double n = 0.333333333333333333333333333333333333333333;
    bool ativo = true;
    var coisa = 10;
    dynamic tudo = "oi";

    print(texto);
    print(numero);
    print("Real = "+n.toString());//Concatenação
    print(ativo?"oi":"tchau");//if ternário
    print(coisa);
    print(tudo);
    tudo = 500;
    print(tudo);
}