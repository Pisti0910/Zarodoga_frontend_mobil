import React from 'react';
import { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import Ip from './Ip';

export default function Beleptetes({ navigation }) {
    const [felhasznaloNev,setFelhasznalonev]=useState("")
    const [jelszo,setJelszo]=useState("")
    const [belepett,setBelepett]=useState(false)
    const [id,setId]=useState(false)
    const [nev,setNev]=useState(false)


    const belepesFv=async ()=>{
   
        var adatok={
          "bevitel1":felhasznaloNev,
          "bevitel2":jelszo
        }
       // alert(adatok.bevitel2)
        const x=await fetch(`${Ip.Ipcim}beleptetes`,
          {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        )
        const y=await x.json()
        if (y.length==0) {
            alert("Hiba")
        } else {
            alert(JSON.stringify(y))
            setBelepett(true)
            setNev(y[0].felh_nev)
            setId(y[0].fel_id)
        }
        
        
    }
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {belepett ? 
      <View>
            <Text>Üdvözöllek {nev} ({id})</Text>
            <Button title="Tovább" onPress={() => navigation.navigate("Belepesutan",{id:id,nev:nev})} />
            <Button title="Kilépés" onPress={() => setBelepett(false)} />
 
      </View>      
      :
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
      }  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FFFAF0",
      padding: 20,
  },
  header: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FF5733",
      marginBottom: 20,
      textAlign: "center",
  },
  input: {
      width: 250,
      height: 45,
      borderWidth: 1,
      borderColor: "#FF7F50",
      borderRadius: 25,
      paddingHorizontal: 15,
      backgroundColor: "#FFFFFF",
      marginBottom: 15,
      fontSize: 16,
      color: "#333",
  },
  loginContainer: {
      width: "90%",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
  },
  loggedInContainer: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
  },
  welcomeText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#FF5733",
      marginBottom: 10,
  },
  userId: {
      fontSize: 16,
      color: "#555",
      marginBottom: 15,
  },
});
