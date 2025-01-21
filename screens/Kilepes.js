import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Kilepes({ navigation, id, nev, onLogout }) {
   

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Belépés után</Text>
      <Text>{id} {nev}</Text>
     <Button title="Kilépés" onPress={() => {onLogout()} }/>
        
      
    </View>
  );
}