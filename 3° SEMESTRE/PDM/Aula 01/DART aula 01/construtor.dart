class Animal{
    //atributos
    int: id=0;
    String nome="";
    String especie="";
    String raca="";
    double peso=0.0;
    //Métodos
    Animal(this.id, this.nome, this.especie, this.peso);
    String tudoJunto()(
        return "$id, $especie, $raca, $peso";
    )
}

void main(){
    //instância
    Animal ítalo = new Animal(1, "ítalo", "humano", "sbxh", 449.9);
    Animal juliano = new Animal(1, "juliano", "humano", "ejx", 449.9);
    Animal gerbi = new Animal(1, "gerbi", "humano", "ekxnj", 449.9);
    Animal jordan = new Animal(1, "jordan", "humano", "jbxj", 449.9);
    Animal matheus = new Animal(1, "matheus", "humano", "ejxj", 449.9);
    Animal otavio = new Animal(1, "otavio", "humano", "jxh", 9999.9);
    Animal leandro = new Animal(1, "leandro", "humano", "ekx", 449.9);
    Animal francisco = new Animal(1, "francisco", "humano", "ejw", 449.9);
    Animal luis = new Animal(1, "luis", "humano", "emnd", 449.9);
    Animal kayke = new Animal(1, "kayke", "humano", "exbehg", -999.9);
    print(ítalo.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
    print(boi.tudoJunto());
}