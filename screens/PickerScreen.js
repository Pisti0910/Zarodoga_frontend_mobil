import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerScreen = ({ route, navigation }) => {
  const { tipusok, selectedTipus } = route.params; // Az adatok fogadása

  // A selectedTipus alapértelmezett értéke egy üres string, ha nincs érték
  const [localSelectedTipus, setLocalSelectedTipus] = useState(selectedTipus || "");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={localSelectedTipus}
        onValueChange={(itemValue) => setLocalSelectedTipus(itemValue)}
        style={{ height: 200, width: 300 }}
      >
        {/* Ellenőrizzük, hogy létezik-e a tipusok tömb, és hogy nem üres */}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PickerScreen;
