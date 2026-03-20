import 'package:flutter/material.dart';

import 'prod.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.amber,
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/sorvete de perereca.webp"), 
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(Color.fromRGBO(0, 0, 0, 0.5),
            BlendMode.dstATop,
            ),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(child: Image.asset("assets/sorvete.jpg", width: 200)),
            Center(
            child: ElevatedButton(
              onPressed: () => Navigator.push(
                context,
                 MaterialPageRoute(
                  builder: (BuildContext context) => Produtos(),
                  ),
                ),
              child: Text("Entrar"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}