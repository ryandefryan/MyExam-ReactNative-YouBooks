import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { UrlAPI } from './../../src/supports/UrlAPI.js';

import {Text, View, Image} from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Grid, Header, Icon, Input, Item, Left, Right, Row, Title } from 'native-base';

const Detail = ({props, navigation, route}) => {

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(false)
    const [dataDetail, setDataDetail] = useState(null)

    useEffect(() => {
        console.log(route.params)
        setImageUrl(route.params.isbn)
        console.log(imageUrl)

        Axios.get('http://openlibrary.org/'+ route.params.key +'.json')
        .then((res)=>{
           setDataDetail(res.data)
        }).catch((err)=>{
            console.log(err)
        })    
    }, [])

    if(dataDetail === null){
        return(
            <Container>
                <Content>
                    <Grid style={{width: '100%', paddingHorizontal: 15, paddingVertical: 20}}>
                        <Card style={{width: '100%', paddingHorizontal: 15, paddingVertical: 15}}>
                            <Row style={{justifyContent: 'center', paddingTop: 0}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                    Loading...
                                </Text>
                            </Row>
                        </Card>
                    </Grid>
                </Content>
            </Container>
        )
    }

  return(
    <Container>
        <Content>
            <Grid style={{width: '100%', paddingHorizontal: 15, paddingVertical: 20}}>
                <Row>
                    <Row>
                        <Image source={{uri:'http://covers.openlibrary.org/b/isbn/' + imageUrl + '-S.jpg'}} style={{width: '100%', height: 300}} />
                    </Row>
                    <Col>
                        <Row>
                            <Text style={{fontSize: 16}}>
                                Title:
                            </Text>
                        </Row>
                        <Row>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                                {dataDetail.title}
                            </Text>
                        </Row>
                        <Row style={{paddingTop: 10, paddingBottom: 0}}>
                            <Text style={{fontSize: 16}}>
                                Subjects:
                            </Text>
                        </Row>
                        <Row>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                                {
                                    (dataDetail.subjects && dataDetail.subjects.map((value, index)=>{
                                        return( 
                                            <Text key={index}>
                                                {value}
                                            </Text>
                                        )
                                    }))
                                }
                            </Text>
                        </Row>
                    </Col>
                </Row>
                <Row>
                {
                    dataDetail.description.hasOwnProperty('value')?
                        <Text>
                            {dataDetail.description.value}
                        </Text>
                    :
                        <Text>
                            {dataDetail.description}
                        </Text>
                }                  
                </Row>
            </Grid>
        </Content>
    </Container>
  )
}

export default Detail
