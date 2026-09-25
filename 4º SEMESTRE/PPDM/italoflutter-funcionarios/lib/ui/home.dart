import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '/root/pallet.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<dynamic> funcionarios = [];
  int indice = 0;

  @override
  void initState() {
    super.initState();
    _carregarJSON();
  }

  Future<void> _carregarJSON() async {
    String dados =
        await rootBundle.loadString('assets/mockup/funcionarios.json');
    setState(() {
      funcionarios = json.decode(dados);
    });
  }

  String _formatarData(String data) {
    final partes = data.split('-');
    return '${partes[2]}/${partes[1]}/${partes[0]}';
  }

  String _formatarSalario(double valor) {
    return 'R\$ ${valor.toStringAsFixed(2).replaceAll('.', ',')}';
  }

  @override
  Widget build(BuildContext context) {
    final funcionario = funcionarios.isNotEmpty ? funcionarios[indice] : null;

    return Scaffold(
      appBar: AppBar(title: const Text("Funcionários")),
      backgroundColor: AppColors.neutro1,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(vertical: 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 32),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  color: AppColors.p1,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.p2.withValues(alpha: 0.5),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: DropdownButton<dynamic>(
                  dropdownColor: AppColors.p1,
                  borderRadius: BorderRadius.circular(12),
                  isExpanded: true,
                  underline: const SizedBox.shrink(),
                  style: const TextStyle(color: AppColors.textoClaro),
                  iconEnabledColor: AppColors.p3,
                  value: funcionarios.isNotEmpty ? funcionarios[indice] : null,
                  items: funcionarios
                      .map(
                        (f) => DropdownMenuItem<dynamic>(
                          value: f,
                          child: Text(
                            f['nome'],
                            style:
                                const TextStyle(color: AppColors.textoClaro),
                          ),
                        ),
                      )
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      indice = funcionarios.indexOf(value);
                    });
                  },
                ),
              ),

              const SizedBox(height: 24),

              Container(
                margin: const EdgeInsets.symmetric(horizontal: 24),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(24),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: const Color.fromARGB(255, 67, 153, 84).withValues(alpha: 0.25),
                      blurRadius: 16,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      decoration: const BoxDecoration(
                        borderRadius: BorderRadius.vertical(
                          top: Radius.circular(24),
                        ),
                        gradient: LinearGradient(
                          colors: [AppColors.p1, AppColors.p2],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 24),
                      child: Center(
                        child: CircleAvatar(
                          radius: 56,
                          backgroundColor: AppColors.p3,
                          child: ClipOval(
                            child: funcionario != null
                                ? Image.network(
                                    "https://picsum.photos/200",
                                    width: 112,
                                    height: 112,
                                    fit: BoxFit.cover,
                                    loadingBuilder: (context, child, loadingProgress) {
                                      if (loadingProgress == null) return child;
                                      return const CircularProgressIndicator();
                                    },
                                    errorBuilder: (context, error, stackTrace) {
                                      if (kDebugMode) {
                                        print("ERRO IMAGEM: $error");
                                      }
                                      return const Icon(
                                        Icons.person,
                                        size: 40,
                                        color: AppColors.textoClaro,
                                      );
                                    },
                                  )
                                : const Icon(
                                    Icons.person,
                                    size: 40,
                                    color: AppColors.textoClaro,
                                  ),
                          ),
                        ),
                      ),
                    ),

                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        children: [
                          Text(
                            funcionario?['nome'] ?? 'Nome do funcionário',
                            style: Theme.of(context).textTheme.titleLarge,
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 14, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.p3.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              funcionario?['cargo'] ?? 'Cargo',
                              style: Theme.of(context).textTheme.labelLarge,
                            ),
                          ),
                          const SizedBox(height: 20),
                          const Divider(color: AppColors.neutro2),
                          const SizedBox(height: 12),
                          _infoRow(
                            Icons.attach_money_rounded,
                            'Salário',
                            funcionario != null
                                ? _formatarSalario(
                                    (funcionario['salario'] as num).toDouble())
                                : 'R\$ 0,00',
                            AppColors.sucesso,
                          ),
                          const SizedBox(height: 12),
                          _infoRow(
                            Icons.calendar_today_rounded,
                            'Contratado em',
                            funcionario != null
                                ? _formatarData(funcionario['dataContratacao'])
                                : '--/--/----',
                            AppColors.p2,
                          ),
                          const SizedBox(height: 12),
                          _infoRow(
                            Icons.badge_rounded,
                            'ID',
                            funcionario != null
                                ? '#${funcionario['id'].toString().padLeft(3, '0')}'
                                : '---',
                            AppColors.alerta,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ElevatedButton.icon(
                      onPressed: indice > 0
                          ? () => setState(() => indice--)
                          : null,
                      icon: const Icon(Icons.chevron_left_rounded),
                      label: const Text("Anterior"),
                    ),
                    Text(
                      '${indice + 1} / ${funcionarios.length}',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    ElevatedButton.icon(
                      onPressed: indice < funcionarios.length - 1
                          ? () => setState(() => indice++)
                          : null,
                      icon: const Icon(Icons.chevron_right_rounded),
                      label: const Text("Próximo"),
                      iconAlignment: IconAlignment.end,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _infoRow(
      IconData icon, String label, String valor, Color corIcone) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: corIcone.withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: corIcone, size: 20),
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: Theme.of(context).textTheme.bodyMedium),
            Text(valor, style: Theme.of(context).textTheme.titleMedium),
          ],
        ),
      ],
    );
  }
}