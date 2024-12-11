import React from 'react';
import { useState,useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import SzavazatFelvitel from './SzavazatFelvitel';
import Ip from './Ip';

export default function SajaMenu2({ navigation, route }) {
  const {id,cim}=route.params
  const [adatok,setAdatok]=useState([])

  const letoltes=async ()=>{
      var adatok={
        "bevitel1":id
      }
      const x=await fetch(`${Ip.Ipcim}SzavazatFelvitel`,
        {
          method: "POST",
          body: JSON.stringify(adatok),
          headers: {"Content-type": "application/json; charset=UTF-8"}
      }
      )
      const y=await x.json()
      setAdatok(y)
      //alert(JSON.stringify(y))
  }

  useEffect(()=>{
      letoltes()
  },[])  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sajamenu 2</Text>
      <Text>{id}</Text>
      <Text>{cim}</Text> 
      {adatok[0] ? <Text> {adatok[0].db} </Text> : <Text> Loading data... </Text>}   
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <SzavazatFelvitel />

    </View>
  );
}