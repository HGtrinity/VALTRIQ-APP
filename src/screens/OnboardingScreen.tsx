import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { colors } from '@theme/colors';

const slides = [
  {
    title: 'Bem-vindo ao Valtriq',
    description: 'O app que elimina o tempo de digitação e gera toda a documentação médica automaticamente.',
    image: require('@assets/onboarding1.png'),
  },
  {
    title: 'Grave a consulta',
    description: 'Aperte o botão, grave a conversa e deixe a IA cuidar do resto.',
    image: require('@assets/onboarding2.png'),
  },
  {
    title: 'Revise e aprove',
    description: 'Receba o relatório pronto, edite se quiser e aprove com um toque.',
    image: require('@assets/onboarding3.png'),
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={slides[index].image} style={styles.image} />
      <Text style={styles.title}>{slides[index].title}</Text>
      <Text style={styles.desc}>{slides[index].description}</Text>
      <Button title={index === slides.length - 1 ? 'Começar' : 'Próximo'} onPress={next} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.background },
  image: { width: 200, height: 200, marginBottom: 32 },
  title: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins', color: colors.primary, marginBottom: 16 },
  desc: { fontSize: 16, fontFamily: 'PT Sans', color: '#333', marginBottom: 32, textAlign: 'center' },
});
