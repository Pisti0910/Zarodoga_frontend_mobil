import React from 'react';
import { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import Ip from './Ip';

export default function Regisztracio({ navigation }) {
    const [felhasznaloNev,setFelhasznalonev]=useState("")
    const [jelszo,setJelszo]=useState("")
    const [jelszo2,setJelszo2]=useState("")



    const regisztralasFv=async ()=>{
        if (jelszo!=jelszo2) {
            alert("A két jelszó nem egyezik!")
        } else {
     
                var adatok={
                "bevitel1":felhasznaloNev,
                "bevitel2":jelszo
                }
                const x=await fetch(`${Ip.Ipcim}regisztracio`,
                {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                }
                )
                const y=await x.text()
                alert(y)
                if (y=="Sikeres regisztráció!") {
                    navigation.navigate("Beleptetes")
                }
                
    }
    }
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
            <TextInput
            style={styles.input}
            onChangeText={setJelszo2}
            placeholder="Jelszó még egyszer"
            value={jelszo2}
            />
            <Button title="Regisztrálás" onPress={() => regisztralasFv()} />
        
   

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