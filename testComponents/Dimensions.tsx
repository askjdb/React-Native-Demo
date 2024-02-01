import React, {  } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'

export default function DimensionsComponents () {
    
    return (
      <View style={[styles.contaner]}>
        <View style={[styles.itemBox]}>
            <Text style={[styles.item]}> 支付 </Text>
        </View>
        <View style={[styles.itemBox]}>
            <Text style={[styles.item]}> 钱包 </Text>
        </View>
        <View style={[styles.itemBox]}>
            <Text style={[styles.item]}> 收款码 </Text>
        </View>
        <View style={[styles.itemBox]}>
            <Text style={[styles.item]}> 卡包 </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    contaner: {
        flexDirection:"row",
        // justifyContent:'space-between'
        flexWrap: "wrap",
    },
    itemBox: {
        width:Dimensions.get("window").width/3,
        height: 30,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"yellow",
    },
    item: {
        color: "red",
        fontSize:20,
    }
})