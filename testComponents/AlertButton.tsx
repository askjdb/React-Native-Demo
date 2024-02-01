import React, {  } from 'react'
import { Text, StyleSheet, View, Button, Alert, Dimensions } from 'react-native'

export default function AlertButton () {
    const createOneChoose = () => {
        Alert.alert(
            "警告标题",
            "警告内容",
            [
                {
                    text:"取消",
                    onPress:()=>console.log("一个选项")
                },
            ]
        )
    }
    const createTwoChoose = () => {
        Alert.alert(
            "警告标题",
            "警告内容",
            [
                {
                    text:"取消",
                    onPress:()=>console.log("两个选项"),
                    style:"cancel",
                },
                {
                    text:"确认",
                    onPress:()=>console.log("两个选项"),
                    style:"default",
                },
            ]
        )
    }
    const createThreeChoose = () => {
        Alert.alert(
            "警告标题",
            "警告内容",
            [
                {
                    text:"取消",
                    onPress:()=>console.log("三个选项"),
                    style:"cancel",
                },
                {
                    text:"确认",
                    onPress:()=>console.log("三个选项"),
                    style:"default",
                },
                {
                    text:"稍后提醒",
                    onPress:()=>console.log("三个选项"),
                    style:"destructive",
                },
            ]
        )
    }
    return (
      <View style={[styles.concenter]}>
        <View style={[styles.btn]}>
            <Button title='一个选项' color={"red"} onPress={createOneChoose}></Button>
        </View>
        <View style={[styles.btn]}>
            <Button title='两个选项' color="#841584" onPress={createTwoChoose}></Button>
        </View>
        <View style={[styles.btn]}>
            <Button title='三个选项' color={"green"} onPress={createThreeChoose}></Button>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        width: 80,
        height:40,
    },
    concenter:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        justifyContent:"space-evenly",
        alignItems:'center',
    }
})