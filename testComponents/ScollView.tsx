import React, {  } from 'react'
import { Text, StyleSheet, SafeAreaView,ScrollView } from 'react-native'

export default function ScollView () {
    
    return (
      <SafeAreaView >
        <ScrollView 
        horizontal={true} //水平滚动
        >
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
            <Text style={[styles.text]}> textInComponent </Text>
        </ScrollView>
        
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    concenter: {
        flex:1,
        justifyContent:'center',
        flexDirection:"row"
    },
    text: {
        color:"red",
        fontSize:20,
        height:40,
    }
})