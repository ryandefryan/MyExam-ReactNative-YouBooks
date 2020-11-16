import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, View} from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Grid, Header, Icon, Input, Item, Left, Right, Row, Title } from 'native-base';

const Saved = ({props}) => {

  const[dataSave, setDataSave] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('@SaveBook')
    .then((data) => {
        console.log(data)
        setDataSave(data)
    })
    .catch((err) => {
        console.log(err)
    })
  }, [])

  return(
    <Container>
      <Content>

      </Content>
    </Container>
  )
}


export default Saved;
