import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerScreen = ({ route, navigation }) => {
  const { tipusok, selectedTipus } = route.params; // Az adatok fogadása

  // A selectedTipus alapértelmezett értéke egy üres string, ha nincs érték
  const [localSelectedTipus, setLocalSelectedTipus] = useState(selectedTipus || "");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Válaszd ki a típust</Text>
      <Picker
        selectedValue={localSelectedTipus}
        onValueChange={(itemValue) => setLocalSelectedTipus(itemValue)}
        style={styles.picker}
      >
        {tipusok && tipusok.length > 0 ? (
          tipusok.map((tipus) => (
            <Picker.Item 
              key={tipus.tipus_id} 
              label={tipus.tipus_nev} 
              value={tipus.tipus_id} 
            />
          ))
        ) : (
          <Picker.Item label="Nincs elérhető típus" value="" />
        )}
      </Picker>

      <Button
        title="Kiválasztás"
        color="#FF7043" // Narancsos színű gomb
        onPress={() => {
          // Visszaküldi az adatot az előző oldalnak
          navigation.navigate('WorkoutForm', { selectedTipus: localSelectedTipus });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  picker: {
    height: 200,
    width: 300,
    backgroundColor: '#FFF7F1', // Világos háttér a pickernek
    borderColor: '#FF7043', // Narancsos szegély
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D84315', // Mély narancsos cím
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF7043', // Narancsos gomb háttér
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF', // Fehér szöveg a gombon
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PickerScreen;
