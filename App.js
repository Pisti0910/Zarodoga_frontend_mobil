import * as React from 'react';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SajatMenu from './screens/SajatMenu';
import DetailsScreen from './screens/DetailsScreen';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SajatMenu2 from './screens/SajatMenu2';
import Tanacsok from './screens/Tanacsok';
import Focistak from './screens/Focistak';
import Beleptetes from './screens/Beleptetes';
import Belepesutan from './screens/Belepesutan';
import Regisztracio from './screens/Regisztracio';
import WorkoutForm from './screens/WorkoutForm';
import WorkoutSummary from './screens/WorkoutSummary';
import VideosScreen from './screens/VideosScreen';
import BeleptetesMashogy from './screens/BeleptetesMashogy'
import BelepettUjMenu from './screens/BelepettUjMenu';
import Kilepes from './screens/Kilepes';
import ProfileScreenBelepett from './screens/ProfileScreenBelepett';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  const [belepett, setBelepett] = useState(false); // Belépési állapot
  const [felhasznaloAdat, setFelhasznaloAdat] = useState({ id: '', nev: '' }); // Felhasználó adatai

 // Függvény a belépés kezelésére
 const kezeldBelepes = (id, nev) => {
  setBelepett(true);
  alert(id)
  setFelhasznaloAdat({ id, nev });
  
};

const kezeldKilepes = () => {
  setBelepett(false);
  setFelhasznaloAdat({ id: '', nev: '' });
};



  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} 
        options={{ title: 'Főmenü' ,
                  headerShown: false,
                  tabBarIcon: () => (
                    <Entypo name="home" size={24} color="black" />
                  )
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Felhasználók' }} />
        <Tab.Screen name="SajatMenu" component={SajatMenu} 
        options={{ title: 'Saját' ,
                  headerShown: false,
                  tabBarIcon: () => (
                    <MaterialCommunityIcons name="home-group" size={24} color="black" />
                  )
        }} />
      </Tab.Navigator>
    );
  }
  
  function EdzesTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Edzés felvitel" component={WorkoutForm} 
        options={{ title: 'Edzés rögzítés' ,
                  headerShown: false,
                  tabBarIcon: () => (
                    <Entypo name="home" size={24} color="black" />
                  )
        }} />
        <Tab.Screen name="Edzésátlag" component={WorkoutSummary} options={{ title: 'Edzéselemzés' }} />
        <Tab.Screen name="Videók" component={VideosScreen} 
        options={{ title: 'Edzős videók' ,
                  headerShown: false,
                  tabBarIcon: () => (
                    <MaterialCommunityIcons name="home-group" size={24} color="black" />
                  )
        }} />
      </Tab.Navigator>
    );
  }
  
  function HomeStack() {
    return (
      <Stack.Navigator options={{ headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home', headerShown: false, }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Részletek' }} />
      </Stack.Navigator>
    );
  }
  function SajatStack() {
    return (
      <Stack.Navigator options={{ headerShown: false}}>
        <Stack.Screen name="SajatMenu" component={SajatMenu} options={{ title: 'Saját', headerShown: false }} />
        <Stack.Screen name="SajatMenu2" component={SajatMenu2} options={{ title: 'Saját 2' }} />
         
      </Stack.Navigator>
    );
  }
  function BeleptetesStack() {
    return (
      <Stack.Navigator options={{ headerShown: false}}>
       
       <Stack.Screen name="Beleptetes" options={{ title: 'Belépés' }}>
          {props => (
            <BeleptetesMashogy
              {...props}
              onLogin={kezeldBelepes} // Továbbítjuk a belépési függvényt
           />
          )}
        </Stack.Screen> 

        <Stack.Screen name="Belepesutan" component={Belepesutan} options={{ title: 'Belépés után' }} />
        <Stack.Screen name="Regisztracio" component={Regisztracio} options={{ title: 'Regisztráció' }} />
     </Stack.Navigator>
    );
  }
  function EdzesStack(){
    return(
      <Stack.Navigator options={{ headerShown: false}}>
        <Stack.Screen name="Edzések" component={WorkoutForm} options={{ title: 'Edzés', headerShown: false }} />
        <Stack.Screen name="Edzésátlag" component={WorkoutSummary} options={{ title: 'Edzéselemzés' }} />
        
     </Stack.Navigator>
    )
  }





  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack" >
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Főmenü' }} />
        {belepett ?
           <Drawer.Screen
           name="ProfileScreenBelepett"
         >
           {props => (
             <ProfileScreenBelepett {...props} id={felhasznaloAdat.id} onLogout={kezeldKilepes} />
           )}
         </Drawer.Screen>
         :
         <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Felhasználók' }}/>
         }
      
        <Drawer.Screen name="SajatStack" component={SajatStack} options={{ title: 'Saját menü' }}/>
        <Drawer.Screen name="Tanacsok" component={Tanacsok} options={{ title: 'Tanácsok' }}/>
        <Drawer.Screen name="Focistak" component={Focistak} options={{ title: 'Focisták' }}/>
        {belepett && (     
        <Drawer.Screen name="EdzesStack" component={EdzesStack} options={{ title: 'Edzés' }}/>
        )}
  {/* Belépés után plusz menüpont a drawerben*/}
  {belepett && (
                    <Drawer.Screen
                    name="BelepettUjMenu"
                  >
                    {props => (
                      <BelepettUjMenu {...props} id={felhasznaloAdat.id} nev={felhasznaloAdat.nev} onLogout={kezeldKilepes} />
                    )}
                  </Drawer.Screen>
    )}
  {/* Belépés után plusz üdv és kilépés*/}
    {belepett ? (
          <Drawer.Screen
            name="Kilepes"
            
          >
            {props => (
              <Kilepes {...props} id={felhasznaloAdat.id} nev={felhasznaloAdat.nev} onLogout={kezeldKilepes} />
            )}
          </Drawer.Screen>
      
        ):
        <Drawer.Screen name="BeleptetesStack" component={BeleptetesStack} options={{ title: 'Beléptetés' }} />      
        }    





      </Drawer.Navigator>
    </NavigationContainer>
  );
}
