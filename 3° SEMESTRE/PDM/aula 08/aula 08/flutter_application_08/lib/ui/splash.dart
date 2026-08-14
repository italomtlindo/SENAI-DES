import 'dart:async';
import 'dart:convert';
import 'home.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;

  String nome = '';
  String idade = '';

  double _top = -400;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..addListener(() {
        setState(() {
          _top =
              -400 + (400 * Curves.easeOut.transform(_controller.value));
        });
      });

    _controller.forward();
  }

  Future<void> salvarNome() async {
    final localStorage = await SharedPreferences.getInstance();
    await localStorage.setString('nome', json.encode(nome));
    await localStorage.setString('idade', json.encode(idade));
    irParaHome();
  }

  void irParaHome() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => Home()),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Positioned(
            top: _top,
            left: 0,
            right: 0,
            child: Image.asset(
              'assets/angola.jpg',
              width: 300,
              height: 300,
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 20,
              children: [
                SizedBox(height: 200),
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: TextField(
                    decoration:
                        InputDecoration(labelText: "Digite seu nome"),
                    onChanged: (value) {
                      nome = value;
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: TextField(
                    decoration:
                        InputDecoration(labelText: "Digite sua idade"),
                    onChanged: (value) {
                      idade = value;
                    },
                  ),
                ),
                ElevatedButton(
                    onPressed: salvarNome, child: Text("Entrar")),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
