import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, SafeAreaView,  } from 'react-native'
import { Avatar,Image } from '@rneui/themed';
import { Button } from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useNavigationType, userInfo, RootState} from '../../utils';
import axios from 'axios';


interface Props{
    userId:string,
}
//https://img.zfn9.com/04/fe/21bc48511a3aafa4ae499784127ad201.jpg
export default function ChatItem (props:Props) {
    const {userId} = props;
    const navigation = useNavigation<useNavigationType<"ChatItem">>();
    const [imgData,setImgData] = useState();

    useEffect(()=>{
      axios.get("https://randomuser.me/api/portraits/men/36.jpg",{ timeout: 5000 }).then((data)=>{
        console.log(data);
        
      }).catch((e)=>{
        console.error(e);
        
      }).finally(()=>console.log("请求结束"))
    },[])
    return (
      <SafeAreaView>
        <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
        <Text> {userId} </Text>
        <Button title={"聊天"} onPress={()=>navigation.navigate("ChatPage",{userId})}></Button>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})




