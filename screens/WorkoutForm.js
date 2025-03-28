import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ip from './Ip';
import PickerScreen from './PickerScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function WorkoutForm() {
  const navigation = useNavigation();
  const route = useRoute();

  const [tipusok, setTipusok] = useState([]);
  const [selectedTipus, setSelectedTipus] = useState('');

  const [beviteliAdat, setBeviteliAdat] = useState({
    leiras: '',
    idoTartam: '',
    egetes: '',
    megjegyzes: ''
  });

  useEffect(() => {
    const letoltes = async () => {
      try {
        const response = await fetch(Ip.Ipcim + 'EdzesTipusok');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTipusok(data);

        if (data.length > 0) {
          setSelectedTipus(data[0].tipus_id);
        }
      } catch (error) {
        Alert.alert('Hiba', 'Nem sikerült betölteni az edzéstípusokat: ' + error.message);
      }
    };
    letoltes();
  }, []);

  // Ha az új oldalról visszakapunk egy értéket
  useEffect(() => {
    if (route.params?.selectedTipus) {
      setSelectedTipus(route.params.selectedTipus);
    }
  }, [route.params?.selectedTipus]);

  const felvitel = async () => {
    try {
      const bemenet = {
        megjegyzes: beviteliAdat.megjegyzes,
        leiras: beviteliAdat.leiras,
        idoTartam: beviteliAdat.idoTartam,
        egetes: beviteliAdat.egetes,
        tipus: selectedTipus,
      };

      const response = await fetch(Ip.Ipcim + 'EdzesFelvitel', {
        method: 'POST',
        body: JSON.stringify(bemenet),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      const text = await response.text();
      alert(text);
    } catch (error) {
      alert('Nem sikerült az edzés felvitele: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edzés felvitele</Text>

      <Text>Válassz edzéstípust</Text>
      <Button
        title={tipusok.find((tipus) => tipus.tipus_id === selectedTipus)?.tipus_nev || 'Választás'}
        onPress={() =>
          navigation.navigate('PickerScreen', {
            tipusok,
            selectedTipus,
          })
        }
      />

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

      <Button title="Edzés rögzítése" onPress={felvitel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D84315', // Mély narancsos cím
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FF7043', // Narancsos szegély
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#FFF7F1', // Világos háttér a bemeneti mezőknek
  },
  button: {
    backgroundColor: '#FF7043', // Narancsos gomb háttér
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF', // Fehér szöveg a gombon
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerButton: {
    backgroundColor: '#FF7043', // Narancsos szín a Picker gombhoz
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
});

