import React from 'react';
import { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import Ip from './Ip';
export default function BeleptetesMashogy({ navigation, onLogin}) {
    const [felhasznaloNev,setFelhasznalonev]=useState("")
    const [jelszo,setJelszo]=useState("")
    
    

    const belepesFv=async ()=>{
    
        var adatok={
          "bevitel1":felhasznaloNev,
          "bevitel2":jelszo
        }
        const x=await fetch(`${Ip.Ipcim}beleptetes`,
          {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        )
        const y=await x.json()
        alert(JSON.stringify(y))
        
        if (y.length==0) {
            alert("Hiba")
        } else {
            //alert(JSON.stringify(y))
           

             // Hívjuk meg az App.js onLogin függvényét
      onLogin(y[0].felhasznalo_id, y[0].felhasznalo_nev);
      //alert("onLogin meghívva", y[0]);
        }
     
        
    }
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     
      <View>

            <TextInput
            style={styles.input}
            onChangeText={setFelhasznalonev}
            placeholder="Felhasználónév"
            value={felhasznaloNev}
            />
            <TextInput
            style={styles.input}
            onChangeText={setJelszo}
            placeholder="Jelszó"
            value={jelszo}
            />

            <Button title="Belépés" onPress={() => belepesFv()} />
            <Button title="Regisztráció" onPress={() => navigation.navigate("Regisztracio")} />
        </View>
    

    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

