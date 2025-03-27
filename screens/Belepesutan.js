import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Belepesutan({ navigation, route }) {
    const {id,nev}=route.params

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Belepes utan</Text>
      <Text>{id} {nev}</Text>
       
      
    </View>
  );
}

