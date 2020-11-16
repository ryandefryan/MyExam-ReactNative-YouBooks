import React, { useState } from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { UrlAPI } from './../../src/supports/UrlAPI.js';

import { onSearchBooks } from './../redux/actions/ListsBooksAction.js';

import {Text, View} from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Grid, Header, Icon, Input, Item, Left, Right, Row, Title } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = ({props, navigation, listsBooks, onSearchBooks}) => {

    const [title, setTitle] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const onSubmit = () => {
        setLoading(true)
        console.log('Loading')

        Axios.get(UrlAPI + '/search.json?title=' + title)
        .then((res) => {
            console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const onSaveBook = (title, publishYear, author) => {
        data = []
        data.push({title, publishYear, author})

        AsyncStorage.setItem('@SaveBook', data)
        .then((respons) => {
            console.log(respons)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return(
    <Container>
        <Content>
            <Grid style={{width: '100%', paddingHorizontal: 15, paddingVertical: 20}}>
                <Row>
                    <Row style={{flex: 9, width: '100%'}}>
                        <Item regular style={{width: '100%', borderWidth: 1}}>
                            <Input onChangeText={setTitle} placeholder='Book Title' style={{width: 300, borderRadius: 5}} />
                        </Item>
                    </Row>
                    <Row style={{flex: 3}}>
                        <Button block onPress={() => onSubmit()} style={{width: 90, height: 52, paddingHorizontal: 10}}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                                Search
                            </Text>
                        </Button>
                    </Row>
                </Row>
            </Grid>
            {
                loading?
                    <Grid style={{width: '100%', paddingHorizontal: 15, paddingVertical: 0}}>
                        <Card style={{width: '100%', paddingHorizontal: 15, paddingVertical: 15}}>
                            <Row style={{justifyContent: 'center', paddingTop: 0}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                    Loading...
                                </Text>
                            </Row>
                        </Card>
                    </Grid>
                :
                    null
            }
            {
                data && data.docs.map((value, index) => {
                    return(
                        <Grid key={index} style={{width: '100%', paddingHorizontal: 15, paddingVertical: 0}}>
                            <Card style={{width: '100%', paddingHorizontal: 15, paddingVertical: 15}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', {key: value.key, isbn: value.isbn[0]})}>
                                    <Row>
                                        <Row>
                                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                                {value.title}
                                            </Text>
                                        </Row>
                                        <Row style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                            <Text style={{fontSize: 14}}>
                                                {value.first_publish_year}
                                            </Text>
                                        </Row>
                                    </Row>
                                </TouchableOpacity>
                                <Row>
                                    <Row>
                                        <Text style={{fontSize: 14}}>
                                            Author :
                                        </Text>
                                        <Text style={{marginLeft: 5, fontSize: 14}}>
                                            {value.author_name}
                                        </Text>
                                    </Row>
                                </Row>
                                <Row style={{paddingTop: 10}}>
                                    <Button onPress={() => onSaveBook(value.title, value.first_publish_year, value.author_name)} style={{width: '100%'}} block>
                                        <Text style={{fontSize: 14, color: 'white'}}>
                                            Save Book
                                        </Text>
                                    </Button>
                                </Row>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Content>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        listsBooks: state.listsBooks
    }
}

const mapDispatchToProps = { onSearchBooks }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
