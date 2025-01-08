import React from 'react';
import { View, Text, Button } from 'react-native';

export default function BelepettUjMenu({ navigation , id, nev}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Belepett menüpontja</Text>
      <Text>{id} {nev}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}