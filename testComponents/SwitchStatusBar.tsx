import React, { useState } from 'react'
import { Text, StyleSheet, View, StatusBar, Switch } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function SwitchStatusBar () {

    const [value, setValue] = useState(false)
    
    const ValueChange = () => {
        setValue(value=> !value)
    }
    return (
      <View style={[styles.concenter]}>
        <StatusBar
            hidden={value} //隐藏状态栏
            backgroundColor={"red"} // 修改状态条的颜色
            barStyle={"dark-content"}
        ></StatusBar>
        <Switch
            trackColor={{false:'red', true: "yellow"}}
            thumbColor={value?"blue":"red"}
            onValueChange={ValueChange}
            value={value}
        ></Switch>
      </View>
    )
}

const styles = StyleSheet.create({
    concenter: {
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    }
})