
import { View, Text, StyleSheet,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ip from './Ip';

export default function Etrend({ id, navigation, route }) {
//alert (id)

const [adatok, setAdatok] = useState([]); 

    useEffect(() => {
        
        const letoltes = async () => {
          try {
            let bemenet = {
                "bevitel1":id
            }


            const response = await fetch(Ip.Ipcim + 'EtrendLekerdez',{
                method: 'POST',
                body: JSON.stringify(bemenet),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
              });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            //alert(JSON.stringify(data))
            setAdatok(data);  // Frissítsd a célok állapotát
            
           
          } catch (error) {
            Alert.alert('Hiba', 'Nem sikerült betölteni a célokat: ' + error.message);
          }
        };
        letoltes();
        
      }, []);


  return (
    <View style={styles.container}>
      <FlatList
                    data={adatok}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                               <Text style={styles.itemTitle}>{item.cel_nev}:</Text>
                            <Text style={styles.itemTitle}>{item.etrend_leiras}</Text>
                           
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#FFF7F1', // Világos törtfehér kártya háttér
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FF7043', // Narancsos-piros kiemelés
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D84315', // Mély narancsos cím
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#6D4C41', // Meleg barna árnyalat a leírásokhoz
  },
});



