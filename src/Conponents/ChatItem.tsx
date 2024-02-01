import React, {  } from 'react'
import { Text, StyleSheet, SafeAreaView,  } from 'react-native'
import { Avatar } from '@rneui/themed';
import { Button } from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useNavigationType, userInfo, RootState} from '../../utils';



interface Props{
    userId:string,
}
//https://img.zfn9.com/04/fe/21bc48511a3aafa4ae499784127ad201.jpg
export default function ChatItem (props:Props) {
    const {userId} = props;
    const navigation = useNavigation<useNavigationType>();
    return (
      <SafeAreaView>
        <Avatar
              size={64}
              rounded
              source={{ uri: "https://img.zfn9.com/04/fe/21bc48511a3aafa4ae499784127ad201.jpg" }}
            />
        <Text> {userId} </Text>
        <Button title={"聊天"} onPress={()=>navigation.navigate("ChatPage",{userId})}></Button>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})




