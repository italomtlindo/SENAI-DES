import 'package:flutter/material.dart';
import 'pallet.dart';

class AppTheme {
  static ThemeData get appTheme => ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.p2,
          primary: AppColors.p2,
          secondary: AppColors.p3,
          surface: AppColors.neutro1,
          onPrimary: AppColors.textoClaro,
          onSurface: AppColors.textoEscuro,
        ),
        scaffoldBackgroundColor: AppColors.neutro1,
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.p1,
          foregroundColor: AppColors.textoClaro,
          centerTitle: true,
          elevation: 4,
          titleTextStyle: TextStyle(
            color: AppColors.textoClaro,
            fontSize: 20,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.2,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.p2,
            foregroundColor: AppColors.textoClaro,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
            textStyle: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.8,
            ),
            elevation: 4,
          ),
        ),
        textTheme: const TextTheme(
          titleLarge: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: AppColors.textoEscuro,
            letterSpacing: 0.5,
          ),
          titleMedium: TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.w600,
            color: AppColors.p1,
          ),
          bodyMedium: TextStyle(
            fontSize: 15,
            color: AppColors.neutro3,
          ),
          labelLarge: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: AppColors.p2,
          ),
        ),
        dropdownMenuTheme: const DropdownMenuThemeData(
          textStyle: TextStyle(color: AppColors.textoClaro),
        ),
      );
}