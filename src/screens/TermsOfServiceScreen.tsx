import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Termos de Serviço</Text>
      <Text style={styles.text}>
        Estes são termos de serviço de exemplo. Adapte este texto para refletir as regras reais de uso do Valtriq, incluindo direitos, deveres, limitações e responsabilidades do usuário e do provedor do serviço.
      </Text>
      {/* Adicione aqui o texto completo dos seus termos */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  text: { fontSize: 16, color: '#333' },
});
