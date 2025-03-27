import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Ip from './Ip';

const WorkoutSummary = () => {
  const [weeklySummary, setWeeklySummary] = useState([]); 
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchWeeklySummary = async () => {
      try {
        let adatok = {
          "bevitel1":4
        }

        const response = await fetch(Ip.Ipcim + 'EdzesAtlag',
        {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        ); // Backend endpoint
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
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D84315', // Mély narancsos szöveg
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF7F1', // Világos háttér a kártyákhoz
    padding: 15,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FF7043', // Pirosas-narancs kiemelés a bal oldalon
  },
  itemText: {
    fontSize: 16,
    color: '#6D4C41', // Meleg barna a szövegekhez
    marginBottom: 5,
  },
});


export default WorkoutSummary;
