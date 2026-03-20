import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: 'IMC', home: App()));
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  String? nome;
  double peso = 0.0;
  double altura = 0.0;
  double imc = 0.0;
  String? resultado;

  void calcular() {
    imc = peso / (altura * altura);
    if (imc <= 18.5) {
      resultado = "$resultado você esta abaixo do peso";
    } else if (imc <= 20) {
      resultado = "$resultado você";
    }

    resultado = "$nome seu IMC é ${imc.toStringAsFixed(1)} você está";
  }

  void alert(BuildContext context, String msg) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Mensagens'),
          content: Text(msg),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text("Ok"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 20.0,
            children: [
              Text(
                "Indice de Massa Corpórea",
                style: TextStyle(fontSize: 26.0),
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: "Nome",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onChanged: (value) {
                  nome = value;
                },
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: "Peso",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onChanged: (value) {
                  peso = double.parse(value);
                },
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: "Altura",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onChanged: (value) {
                  altura = double.parse(value);
                },
              ),
              ElevatedButton(
                onPressed: () {
                  calcular();
                  alert(context, "$resultado");
                },
                child: Text('Calcular'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}