import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Button} from '@rneui/themed';
import ChatItem from '../Conponents/ChatItem';
import {useNavigation} from '@react-navigation/native';
import {useNavigationType, userInfo, RootState} from '../../utils';
import {useSelector} from 'react-redux';

export default function Home() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const navigation = useNavigation<useNavigationType<"Home">>();
  const userId = useSelector<RootState, userInfo>(state => state.UserInfo);

  useEffect(()=>{
    
  },[])
  useEffect(() => {
    setLoading(true);
    fetch('http://172.16.10.157:3000/alluser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    }).then(async (data)=>{
      setLoading(false);
      const result = await data.json();
      setUserList(result.data)
    }).catch((e)=>{
      console.log(e);
    })
  }, [userId]);
  return (
    <SafeAreaView>
      {loading ? <ActivityIndicator></ActivityIndicator> : null}
      {
        userList.map((item,index)=>{
          return (
            <ChatItem userId={item} key={item} ></ChatItem>
          )
        })
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
