import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Részletek</Text>
      <Button title="Vissza" onPress={() => navigation.goBack()} />
    </View>
  );
}