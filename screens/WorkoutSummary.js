import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Ip from './Ip';

const WorkoutSummary = () => {
  const [weeklySummary, setWeeklySummary] = useState([]); 
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchWeeklySummary = async () => {
      try {
        const response = await fetch(Ip.Ipcim + 'EdzesAtlag'); // Backend endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeeklySummary(data); 
      } catch (error) {
        Alert.alert('Hiba', 'Nem sikerült a heti összegzés betöltése: ' + error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchWeeklySummary();
  }, []);

  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Betöltés...</Text>
      </View>
    );
  }

 
  if (weeklySummary.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nincs elérhető heti adat.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Heti Összehasonlítás</Text>

      
      <FlatList
        data={weeklySummary}
        keyExtractor={(item) => item.edzes_felhid.toString() + item.edzes_tipus}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Felhasználó: {item.edzes_felhid}</Text>
            <Text style={styles.itemText}>Edzés típusa: {item.edzes_tipus}</Text>
            <Text style={styles.itemText}>
              Átlag időtartam: {item['AVG(edzes_idotartam)'].toFixed(2)} perc
            </Text>
            <Text style={styles.itemText}>
              Átlag kalóriaégetés: {item['AVG(edzes_egetes)'].toFixed(2)} kcal
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default WorkoutSummary;
