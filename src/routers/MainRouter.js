import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Saved from '../screens/Saved';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const Homestack=()=>{
  return <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Detail"component={Detail}/>

  </Stack.Navigator>
}

function MainRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Homestack} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  );
}

export default MainRouter;