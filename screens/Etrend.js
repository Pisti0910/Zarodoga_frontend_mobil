
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

            alert(JSON.stringify(data))
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
                               <Text style={styles.itemTitle}>{item.cel_nev}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
