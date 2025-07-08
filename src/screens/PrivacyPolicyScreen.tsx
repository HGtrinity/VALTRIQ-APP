import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>
      <Text style={styles.text}>
        Esta é uma política de privacidade de exemplo. Adapte este texto para refletir as práticas reais do Valtriq quanto à coleta, uso, armazenamento e compartilhamento de dados pessoais, em conformidade com a LGPD e as exigências das lojas de aplicativos.
      </Text>
      {/* Adicione aqui o texto completo da sua política */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  text: { fontSize: 16, color: '#333' },
});
