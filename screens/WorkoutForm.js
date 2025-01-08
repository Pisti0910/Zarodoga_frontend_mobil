import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Ip from './Ip';
import { Picker } from '@react-native-picker/picker';

export default function WorkoutForm() {
  const [tipusok, setTipusok] = useState([]); // A válasz tárolása
  const [selectedTipus, setSelectedTipus] = useState(tipusok[0]?.tipus_id || '');
  const [beviteliAdat, setBeviteliAdat] = useState({
    leiras: '',
    idoTartam: '',
    egetes: '',
    megjegyzes: ''
  });

  // Edzéstípusok lekérése a backendről
  useEffect(() => {
  
    const letoltes = async () => {
      try {
        const response = await fetch(Ip.Ipcim + 'EdzesTipusok');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        alert(JSON.stringify(data))

        setTipusok(data);
        
        if (data.length > 0) {
          setSelectedTipus(data[0].tipus_id); // Alapértelmezett érték beállítása
        }
        
      } catch (error) {
        Alert.alert('Hiba', 'Nem sikerült betölteni az edzéstípusokat: ' + error.message);
      }
    };
    letoltes();
 
  }, []);
   // A useEffect csak egyszer fut le, amikor a komponens betöltődik

  // Edzés adatainak beküldése
  const felvitel = async () => {
    try {
      const bemenet = {

        "megjegyzes": beviteliAdat.megjegyzes,
        "leiras": beviteliAdat.leiras,
        "idoTartam": beviteliAdat.idoTartam,
        "egetes": beviteliAdat.egetes,
        "tipus": selectedTipus, // A kiválasztott edzéstípus hozzáadása
      };
  
      const response = await fetch(Ip.Ipcim + 'EdzesFelvitel', {
        method: 'POST',
        body: JSON.stringify(bemenet), // Javított body formázás
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
  
     
  
      const text = await response.text();
      alert( text); // Szöveges válasz a backendről
    } catch (error) {
      alert('Nem sikerült az edzés felvitele: ' + error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Edzés felvitele</Text>
      
      {/* Picker a típus kiválasztásához */}
      <Text>Válassz edzéstípust</Text>
      <Picker
  selectedValue={selectedTipus}
  onValueChange={(itemValue) => setSelectedTipus(itemValue)}
  style={{ height: 100, width: 200 }} // Mobilon ez fontos lehet
>
  {tipusok.map((tipus) => (
    <Picker.Item key={tipus.tipus_id} label={tipus.tipus_nev} value={tipus.tipus_id} />
  ))}
</Picker>


      {/* A form mezők */}
      <TextInput
       editable
       multiline
       numberOfLines={4}
       maxLength={100}
        style={styles.input}
        placeholder="Edzés leírása"
        value={beviteliAdat.leiras}
        onChangeText={(text) => setBeviteliAdat({ ...beviteliAdat, leiras: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Időtartam"
        keyboardType="numeric"
        value={beviteliAdat.idoTartam}
        onChangeText={(text) => setBeviteliAdat({ ...beviteliAdat, idoTartam: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="egetes"
        value={beviteliAdat.egetes}
        onChangeText={(text) => setBeviteliAdat({ ...beviteliAdat, egetes: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Megjegyzés"
        value={beviteliAdat.megjegyzes}
        onChangeText={(text) => setBeviteliAdat({ ...beviteliAdat, megjegyzes: text })}
      />

      {/* Gomb az adatküldéshez */}
      <Button title="Edzés rögzítése" onPress={felvitel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingLeft: 10,
  },
});
