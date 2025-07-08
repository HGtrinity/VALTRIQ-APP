import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../api/supabase';
import { Consultation } from '../types';

const HomeScreen = ({ navigation }) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .neq('status', 'done');

      if (error) {
        console.error('Error fetching consultations:', error);
      } else {
        setConsultations(data);
      }
    };

    fetchConsultations();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Doc', { consultationId: item.id })}
    >
      <Text style={styles.patientName}>{item.patient_name}</Text>
      <Text style={styles.date}>{new Date(item.started_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;