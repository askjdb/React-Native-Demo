import { Button } from '@rneui/base'
import React, {  } from 'react'
import { Text, StyleSheet, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useNavigationType,} from '../../utils';
export default function User () {
  const navigation = useNavigation<useNavigationType<'User'>>();
    const leave = async () => {
      const result = await AsyncStorage.removeItem('userid');
      navigation.navigate("Login");
    }
    return (
      <SafeAreaView>
        <Text> user </Text>
        <Button title={"退出登录"} onPress={()=>leave()}></Button>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})