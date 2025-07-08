import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export function ConsultCard({ patient, date, status }: { patient: string, date: string, status: string }) {
  return (
    <View style={[styles.card, status === 'review' && styles.review]}> 
      <Text style={styles.patient}>{patient}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={[styles.status, status === 'review' ? styles.statusReview : styles.statusDone]}>
        {status === 'review' ? 'Pronto para Revisão' : 'Completo'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  review: {
    borderLeftWidth: 6,
    borderLeftColor: colors.success,
  },
  patient: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  date: {
    color: colors.gray,
    marginBottom: 4,
  },
  status: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusReview: {
    color: colors.success,
  },
  statusDone: {
    color: colors.gray,
  },
});
