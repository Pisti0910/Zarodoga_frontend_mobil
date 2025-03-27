import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Kilepes({ navigation, id, nev, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Belépés után</Text>
      <Text style={styles.userInfo}>{id} {nev}</Text>
      
      <Button
        title="Kilépés"
        onPress={() => { onLogout() }}
        color="#FF7043" // Narancssárga gomb
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFE8D6", // Halvány narancsos háttér
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#FF7043", // Narancssárga szín a címhez
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: "#333", // Sötétebb szürke szín a felhasználói adatokhoz
  },
});

