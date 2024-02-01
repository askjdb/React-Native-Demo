import React, {useContext, useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Dimensions,Keyboard } from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useRouteType} from '../../utils';
import {USERID} from '../../App';
import {Input} from '@rneui/base';
import {Icon} from '@rneui/themed';

export default function Chatpage() {
  const getUserId = useContext<(userId: string) => void>(USERID);
  const route = useRoute<useRouteType>();

  const inp = useRef<Input | null>(null);
  const [content, setContent] = useState("")

  const send = () => {
    console.log(content);
    if(inp.current){
      inp.current.clear()
      Keyboard.dismiss()
    }
  };

  const {userId} = route.params as {userId: string};
  useEffect(() => {
    getUserId(userId);
  });
  return (
    <SafeAreaView style={[styles.concenter]}>
      <View></View>
      <Input
        disabledInputStyle={{backgroundColor: '#ddd'}}
        leftIconContainerStyle={{}}
        rightIcon={
          <Icon
            onPress={() => send()}
            name="sc-telegram"
            type="evilicon"
            color="#517fa4"
          />
        }
        containerStyle={{
          width: Dimensions.get('window').width * 0.9,
        }}
        onChangeText={(value)=>setContent(value)}
        ref={(ref:any) => (inp.current = ref)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  concenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});