import React, {  } from 'react'
import { Text, StyleSheet, SafeAreaView,Dimensions } from 'react-native'
import { content } from '../../utils'

interface Props{
    content:content,
    MyuserId:string,
}
export default function ContentItem (props:Props) {
    const { content,MyuserId} = props;
    return (
      <SafeAreaView>
        <Text style={MyuserId === content.from ? styles.right : styles.left}> {content.content} </Text>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    left:{
        width:Dimensions.get('window').width,
        textAlign:'left',
        marginBottom:20,
        marginTop:20,
        paddingLeft:10,
    },
    right:{
        width:Dimensions.get('window').width,
        textAlign:"right",
        marginBottom:20,
        paddingRight:10,
    }
})