import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Részletek</Text>
      <Button
        title="Vissza"
        onPress={() => navigation.goBack()}
        color="#FF7043" // Narancssárga gombszín
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D84315', // Erősebb narancssárga szín a címhez
    marginBottom: 20,
  },
});
