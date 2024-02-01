import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import MyButton from '../Conponents/MyButton'
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  useRouteType,
  useNavigationType,
  SubmitEditType,
  KeyPressType,
} from '../../utils';

const ProfileScreen: React.FC = () => {
  const [show, setShow] = useState(false)
  // const route = useRoute<useRouteType>();
  // const navigation = useNavigation<useNavigationType>();
  const textInput = useRef<TextInput>(null);
  useLayoutEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardDidHide' : 'keyboardDidHide',
      () => {
        if (textInput.current) {
          textInput.current.blur();
          setShow(false)
        }
      },
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  const [value, setValue] = useState('');


  const clear = () => {
    if (textInput.current) {
      textInput.current.clear();
    }
  }
  const SubmitEdit = (props: SubmitEditType) => {
    const {nativeEvent} = props;
    console.log(nativeEvent);
    
  };
  const foucs = () => {
    setShow(true)
  }
  const Send = () => {
      fetch('http://172.16.10.157:3000/getdata',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 指定请求体的数据类型为 JSON
          // 可根据需求添加其他请求头
        },
        body : JSON.stringify({
          value,
        })
      }).then(async (data)=>{
        const response = await data.json()
        console.log(response);
        
      }).catch((e)=>{
        console.log("错误的",e);
        
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          ref={textInput}
          style={styles.TextInput}
          onChangeText={value => {
            setValue(value);
          }}
          value={value}
          placeholder="请输入"
          returnKeyType={'send'}
          onSubmitEditing={SubmitEdit}
          onFocus={foucs}
          maxLength = {55}
        />
        <View style={styles.MyButtonBox}>
          {show ? (<MyButton title="X" onPress={clear} style={styles.MyButtonClear}></MyButton>) : null}
          {show ? (<MyButton title="发送" onPress={Send} style={styles.MyButtonSend}></MyButton>) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft:30,
    paddingLeft : 10,
  },
  container: {
    position : "relative",
    flex: 1, // 使用 flex 填充整个屏幕
    justifyContent: 'space-between', // 在垂直方向上，将子组件平均分布
    padding: 16, // 可选：添加内边距
  },
  inputBox:{
    position : 'absolute',
    width:520,
    bottom:16,
    left : 10,
  },
  MyButtonBox : {
    width : 80,
    height : 40,
    position : "absolute",
    right : 5,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'center',
  },
  MyButtonClear:{ 
    width: 26, 
    height: 26, 
    fontSize: 10, 
    borderRadius:13,
    backgroundColor:"gray",
    color : "#F8F8FF"
  },
  MyButtonSend : {
    flex:1,
    marginLeft:10,
    color : "white"
  }
});

export default ProfileScreen;
