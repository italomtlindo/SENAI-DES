import 'dart:convert';

import '/ui/splash.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  String nome = '';
  String idade = '';

  @override
  void initState() {
    super.initState();
    obterDados();
  }

  Future<void> obterDados() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.containsKey('nome')) {
      setState(() {
        nome = json.decode(prefs.getString('nome')!);
        idade = json.decode(prefs.getString('idade')!);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(nome), backgroundColor: const Color.fromARGB(255, 25, 102, 45)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text('Bem vindo $nome'),
            Text('Idade: $idade'),
            ElevatedButton(
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => SplashScreen()),
                );
              },
              child: Text('Voltar'),
            ),
          ],
        ),
      ),
    );
  }
}