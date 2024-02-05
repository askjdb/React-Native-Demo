import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, Button, Tile} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationType, userAction, userInfo} from '../../utils';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';

export default function Login() {
  const [password, setPassword] = useState<string>('');
  const [account, setCount] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean | undefined>(false);
  const [msg, setMsg] = useState('');
  const [ifShowWarn, setTfSowWarn] = useState<boolean>(false);
  const navigation = useNavigation<useNavigationType<'Login'>>();

  const dispatch = useDispatch<Dispatch<userAction>>();
  const [showWait, setShowWait] = useState<boolean>(false);
  const ifShowPassword = useCallback(() => {
    setShowPassword(() => (showPassword ? false : true));
  }, [showPassword]);

  useEffect(() => {
    toWhere();
  },[]);
  async function toWhere() {
    try {
      const result = await AsyncStorage.getItem('userid');
      if (result !== null) {
        dispatch({type: 'LOGIN', data:{userId:result}});
          navigation.replace('Index');
      } else {
        Alert.alert('Token过期', '请重新登录');
      }
    } catch (e) {
      console.log(e);
    }
  }

  const toRegister = useCallback(() => {
    navigation.replace('Register');
  }, []);

  const ToLogin = useCallback(() => {
    setShowWait(true);
    fetch('http://172.16.10.157:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        account,
      }),
    })
      .then(async response => {
        const result = await response.json();
        setShowWait(false);
        setTfSowWarn(true);
        setMsg(result.msg);
        if (result.code === 1) {
          dispatch({type: 'LOGIN', data: {userId:result.data.userID}});
          await AsyncStorage.setItem('userid',result.data.userID);
          navigation.replace('Index');
        }
      })
      .catch(e => {
        console.log(e);
      }).finally(()=>{
        setTfSowWarn(false);
      })
  }, [password, account, navigation]);

  return (
    <SafeAreaView style={[styles.concenter]}>
      <View style={[styles.LoginBox]}>
        {ifShowWarn ? <Text style={styles.subHeader}>{msg}</Text> : null}
        {showWait ? <ActivityIndicator color={'red'} size={'large'} /> : null}
        <Input
          disabledInputStyle={{backgroundColor: '#ddd'}}
          leftIcon={<Icon name="account-outline" size={20} />}
          onChangeText={value => setCount(value)}
          placeholder="请输入账号"
        />
        <Input
          placeholder="请输入密码"
          leftIcon={<Icon name="lock-outline" size={20} />}
          onChangeText={value => setPassword(value)}
          secureTextEntry={showPassword}
          rightIcon={
            showPassword ? (
              <Icon onPress={ifShowPassword} name="eye-off" size={20} />
            ) : (
              <Icon onPress={ifShowPassword} name="eye" size={20} />
            )
          }
        />
        <View style={[styles.ButtonBox]}>
          <View style={[styles.LoginButton]}>
            <Button title={'登录'} onPress={ToLogin}></Button>
          </View>
          <View style={[styles.RegisterButton]}>
            <Text>还没有账号？</Text>
            <Text onPress={toRegister} style={{color: 'blue'}}>
              注册
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  concenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginBox: {
    width: Dimensions.get('window').width,
  },
  ButtonBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  LoginButton: {
    width: Dimensions.get('window').width / 2,
    marginBottom: 10,
  },
  RegisterButton: {
    width: Dimensions.get('window').width / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeader: {
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    width: 300,
    fontSize: 20,
    position: 'absolute',
    left: '50%', // 设置 left 为容器宽度的一半
    marginLeft: -150, // 使用 marginLeft 为元素宽度的一半的负值
    top: -40,
  },
});
