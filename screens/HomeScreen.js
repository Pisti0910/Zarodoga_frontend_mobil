import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Főmenü</Text>
      <Text style={styles.text}>Üdvözlünk a Focis mobil applikációnkon!</Text>
      <Text style={styles.text}>Készítette: Gaál István és Szilágyi István Marcell</Text>

      <Button
            title="Meghívás"
            onPress={() => navigation.navigate('Details')}
            color="#FF8C42" // Erősebb narancs szín a gombhoz
        /> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF5E1", // Halvány narancssárga háttér
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#D98A47', // Narancssárga szín a címekhez
        marginBottom: 15,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: '#D98A47', // Narancssárga szín a szövegekhez
        marginBottom: 10,
    }
});
