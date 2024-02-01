import React, {  } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Platform,Alert } from 'react-native'

export default function Activeawite () {
    if(Platform.OS === "android"){
      Alert.alert("是安卓")
    } else {
      Alert.alert("是IOS")
    }
    return (
      <View style={styles.concenter}>
        <ActivityIndicator 
          color={"red"}
          size={"large"}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    concenter:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    }
})
