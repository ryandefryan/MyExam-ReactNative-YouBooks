import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

import MainRouter from './src/routers/MainRouter';

const App = (props) => {
  return(
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  )
}


export default App;
