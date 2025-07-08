import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { supabase } from '../api/supabase';
import { useRoute } from '@react-navigation/native';

const DocScreen = () => {
  const route = useRoute();
  const { consultationId } = route.params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('soap')
        .eq('consultation_id', consultationId)
        .single();

      if (error) {
        console.error('Error fetching report:', error);
      } else {
        setReport(data.soap);
      }
      setLoading(false);
    };

    fetchReport();
  }, [consultationId]);

  const handleApprove = async () => {
    const { error } = await supabase
      .from('consultations')
      .update({ status: 'done' })
      .eq('id', consultationId);

    if (error) {
      console.error('Error updating consultation status:', error);
    } else {
      // Navigate back or show success message
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Text>Report:</Text>
        <Text>{JSON.stringify(report, null, 2)}</Text>
        <Button title="Approve" onPress={handleApprove} />
      </View>
    </ScrollView>
  );
};

export default DocScreen;