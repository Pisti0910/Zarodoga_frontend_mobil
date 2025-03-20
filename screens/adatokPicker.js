import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AdatokPicker = ({ route, navigation }) => {
  const { celok, selectedCel } = route.params;
  const [localSelectedCel, setLocalSelectedCel] = useState(selectedCel || "");

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={localSelectedCel}
        onValueChange={(itemValue) => setLocalSelectedCel(itemValue)}
        style={{ height: 200, width: 300 }}
      >
        {celok && celok.length > 0 ? (
          celok.map((cel) => (
            <Picker.Item 
              key={cel.cel_id} 
              label={cel.cel_nev} 
              value={cel.cel_id} 
            />
          ))
        ) : (
          <Picker.Item label="Nincs elérhető cél" value="" />
        )}
      </Picker>

      <Button
        title="Kiválasztás"
        onPress={() => {
          navigation.navigate('UresOldal', { selectedCel: localSelectedCel });
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
    padding: 20,
  },
});

export default AdatokPicker;