import 'package:flutter/material.dart';
import '/root/pallet.dart';
import 'home.dart';

class Splash extends StatefulWidget {
  const Splash({super.key});

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _opacityController;
  late AnimationController _saidaController;

  late Animation<double> _scaleAnim;
  late Animation<double> _opacityAnim;
  late Animation<double> _saidaScaleAnim;
  late Animation<double> _saidaOpacityAnim;

  @override
  void initState() {
    super.initState();
    _configurarAnimacoes();
    _entrada();
  }

  void _configurarAnimacoes() {
    _scaleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _scaleAnim = CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    );

    _opacityController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _opacityAnim = CurvedAnimation(
      parent: _opacityController,
      curve: Curves.easeIn,
    );

    _saidaController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _saidaScaleAnim = Tween<double>(begin: 1.0, end: 3.0).animate(
      CurvedAnimation(parent: _saidaController, curve: Curves.easeIn),
    );
    _saidaOpacityAnim = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(parent: _saidaController, curve: Curves.easeIn),
    );
  }

  void _entrada() {
    _scaleController.forward();
    _opacityController.forward();
  }

  void _resetar() {
    _scaleController.reset();
    _opacityController.reset();
    _saidaController.reset();
    _entrada();
  }

  void _saida() {
    _saidaController.forward().then((_) => _irParaHome());
  }

  Future<void> _irParaHome() async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const Home()),
    );
    _resetar();
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _opacityController.dispose();
    _saidaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.p1,
      appBar: AppBar(title: const Text("Funcionários")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedBuilder(
              animation: Listenable.merge(
                  [_scaleController, _saidaController, _opacityController]),
              builder: (context, child) {
                final entradaAtiva = _saidaController.value == 0;
                final escala =
                    entradaAtiva ? _scaleAnim.value : _saidaScaleAnim.value;
                final opacidade =
                    entradaAtiva ? _opacityAnim.value : _saidaOpacityAnim.value;

                return Opacity(
                  opacity: opacidade.clamp(0.0, 1.0),
                  child: Transform.scale(
                    scale: escala,
                    child: child,
                  ),
                );
              },
              child: Container(
                width: 140,
                height: 140,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.p2,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.p3.withValues(alpha: 0.5),
                      blurRadius: 30,
                      spreadRadius: 8,
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.people_rounded,
                  size: 80,
                  color: AppColors.textoClaro,
                ),
              ),
            ),
            const SizedBox(height: 40),
            AnimatedBuilder(
              animation: _opacityController,
              builder: (context, child) => Opacity(
                opacity: _opacityAnim.value,
                child: child,
              ),
              child: const Text(
                "Gestão de Funcionários",
                style: TextStyle(
                  color: AppColors.textoClaro,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                ),
              ),
            ),
            const SizedBox(height: 48),
            AnimatedBuilder(
              animation: _opacityController,
              builder: (context, child) => Opacity(
                opacity: _opacityAnim.value,
                child: child,
              ),
              child: ElevatedButton.icon(
                onPressed: _saida,
                icon: const Icon(Icons.login_rounded),
                label: const Text("Entrar"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}