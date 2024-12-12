import * as React from 'react';
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      options={{ title: 'Sajat' ,
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
      <Stack.Screen name="Beleptetes" component={Beleptetes} options={{ title: 'Belépés', headerShown: false }} />
      <Stack.Screen name="Belepesutan" component={Belepesutan} options={{ title: 'Belépés után' }} />
      <Stack.Screen name="Regisztracio" component={Regisztracio} options={{ title: 'Regisztráció' }} />
   </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack" >
        <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: 'Főmenü' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Felhasználók' }}/>
        <Drawer.Screen name="SajatStack" component={SajatStack} options={{ title: 'Saját menü' }}/>
        <Drawer.Screen name="Tanacsok" component={Tanacsok} options={{ title: 'Tanácsok' }}/>
        <Drawer.Screen name="Focistak" component={Focistak} options={{ title: 'Focisták' }}/>
        <Drawer.Screen name="BeleptetesStack" component={BeleptetesStack} options={{ title: 'Beléptetés' }}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
