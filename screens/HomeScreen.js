import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Főmenü</Text>
      <Text>Üdvözlünk a Focis mobil applikációnkon!</Text>
      <Text>Készítette: Gaál István és Szilágyi István Marcell</Text>
      <Button
            title="Meghívás"
            onPress={() => navigation.navigate('Details')}
        /> 
    </View>
  );
}