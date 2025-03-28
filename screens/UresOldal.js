import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Ip from './Ip';

const UresOldal = ({ id, navigation, route }) => {
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [bevitel3, setBevitel3] = useState('');
  const [bevitel4, setBevitel4] = useState('');
  const [bevitel5, setBevitel5] = useState('');
  const [bevitel6, setBevitel6] = useState('');

  const [celok, setCel] = useState([]);
  const [selectedCel, setSelectedCel] = useState(null);

  useEffect(() => {
    const letoltes = async () => {
      try {
        const response = await fetch(Ip.Ipcim + 'EdzesCelok');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCel(data);  // Frissítsd a célok állapotát
        
        if (data.length > 0) {
          setSelectedCel(data[0].cel_id);  // Alapértelmezett cél beállítása
        }
      } catch (error) {
        Alert.alert('Hiba', 'Nem sikerült betölteni a célokat: ' + error.message);
      }
    };
    letoltes();
  }, []);

  useEffect(() => {
    if (route.params?.selectedCel) {
      setSelectedCel(route.params.selectedCel);
    }
  }, [route.params?.selectedCel]);

  const felvitel = async () => {
    try {
      const bemenet = {
        "felh": id,
        "bevitel1": bevitel1,
        "bevitel2": bevitel2,
        "bevitel3": bevitel3,
        "bevitel4": bevitel4,
        "bevitel5": bevitel5,
        "bevitel6": bevitel6,
        "cel_id": selectedCel,
      };

      const response = await fetch(Ip.Ipcim + 'FelhasznaloiAdatgyujtes', {
        method: 'POST',
        body: JSON.stringify(bemenet),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      const text = await response.text();
      Alert.alert('Siker', text);
    } catch (error) {
      Alert.alert('Hiba', 'Nem sikerült az adatok felvitele: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adatgyűjtés</Text>

      <TextInput
        placeholder="Kor"
        value={bevitel1}
        onChangeText={setBevitel1}
        style={styles.input}
      />
      <TextInput
        placeholder="Nem"
        value={bevitel2}
        onChangeText={setBevitel2}
        style={styles.input}
      />
      <TextInput
        placeholder="Magasság"
        value={bevitel3}
        onChangeText={setBevitel3}
        style={styles.input}
      />
      <TextInput
        placeholder="Súly"
        value={bevitel4}
        onChangeText={setBevitel4}
        style={styles.input}
      />
      <TextInput
        placeholder="Testtípus (pl. aktív, ülő életmód, stb.)"
        value={bevitel5}
        onChangeText={setBevitel5}
        style={styles.input}
      />

      <Button
        title="Cél kiválasztása"
        onPress={() => {
          if (celok.length > 0) {
            navigation.navigate('adatokPicker', { celok, selectedCel });
          } else {
            Alert.alert('Hiba', 'Nincsenek elérhető célok.');
          }
        }}
        color="#FF7043"
      />

      <Button
        title="Adatok küldése"
        onPress={felvitel}
        color="#FF7043"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFE8D6", // Halvány narancsos háttér
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "#FF7043", // Narancssárga cím
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF7043', // Narancssárga szegély
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});

export default UresOldal;
