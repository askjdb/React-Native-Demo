import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Keyboard,
  ScrollView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useRouteType, content} from '../../utils';
import {USERID} from '../../App';
import {Input, } from '@rneui/base';
import {Icon} from '@rneui/themed';
import {userInfo, RootState, SubmitEditType} from '../../utils';
import {useSelector} from 'react-redux';
import ContentItem from '../Conponents/ContentItem';


export default function Chatpage() {
  const getUserId = useContext<(userId: string) => void>(USERID);
  const route = useRoute<useRouteType<'ChatPage'>>();
  const MyuserId = useSelector<RootState, userInfo>(state => state.UserInfo);
  const inp = useRef<Input | null>(null);
  const [content, setContent] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);
  const [contentList, setContentList] = useState<content[]>([]);
  const scoket = useRef<WebSocket>();
  const {userId} = route.params;

  const send = async () => {
    if (inp.current) {
      inp.current.clear();
      Keyboard.dismiss();
    }
    if (scoket.current) {
      scoket?.current?.send(
        JSON.stringify({from: MyuserId.userId, to: userId, content: content}),
      );
    }
  };

  const submit = ({nativeEvent}:NativeSyntheticEvent<TextInputSubmitEditingEventData>) =>{
    const {text}= nativeEvent
    if (inp.current) {
      inp.current.clear();
      Keyboard.dismiss();
    }
    if (scoket.current) {
      scoket?.current?.send(
        JSON.stringify({from: MyuserId.userId, to: userId, content: text}),
      );
    }
  }
  // 设置谈话对象
  useEffect(() => {
    getUserId(route.params.userId);
  }, [route]);
  useEffect(() => {
    // 创建 WebSocket 连接
    const newSocket = new WebSocket(
      `ws://172.16.10.157:3000/?userId=${MyuserId.userId}`,
    );
    // 将新的 WebSocket 实例保存在状态中
    scoket.current = newSocket;
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    );
    // 在组件卸载时关闭 WebSocket 连接
    return () => {
      if (scoket.current) {
        scoket.current.close();
      }
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    if (scoket.current) {
      // 设置事件处理程序
      scoket.current.onopen = () => {
        console.log('WebSocket 连接已打开');
      };

      scoket.current.onmessage = event => {
        const result = JSON.parse(event.data.toString());
        if (result.code === 1) {
          const data = [result.data];
          setContentList([...contentList, ...data]);
          console.log(result);
        }
      };

      scoket.current.onclose = event => {
        console.log('WebSocket 连接已关闭:', event.code, event.reason);
      };

      scoket.current.onerror = error => {
        console.error('WebSocket 错误:', error.message);
      };
    }
  }, [contentList]);
  // 获取聊天记录
  useEffect(() => {
    fetch('http://172.16.10.157:3000/allConent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: route.params.userId,
        from: MyuserId.userId,
      }),
    }).then(async result => {
      const data = await result.json();
      if (data.code == 1) {
        setContentList(data.result);
      }
    });
  }, []);
  return (
    <SafeAreaView style={[styles.concenter]}>
      <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        if(scrollViewRef.current){
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      }}
      style={[styles.chatBox]}
      >
        {contentList.map((item, index) => {
          return (
            <ContentItem
              MyuserId={MyuserId.userId}
              content={item}
              key={index}
            />
          );
        })}
      </ScrollView>
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
        onChangeText={value => setContent(value)}
        ref={(ref: any) => (inp.current = ref)}
        onSubmitEditing={(nativeEvent)=>submit(nativeEvent)}
        returnKeyType={"send"}
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
  chatBox:{
  },
})
