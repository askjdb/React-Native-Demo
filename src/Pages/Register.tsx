import React, {useState, useCallback} from 'react';
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

import {useNavigationType} from '../../utils';

export default function Login() {
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [account, setCount] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean | undefined>(false);
  const [showPassword2, setShowPassword2] = useState<boolean | undefined>(
    false,
  );
  const [msg, setMsg] = useState('');
  const [ifShowWarn, setTfSowWarn] = useState<boolean>(false);
  const navigation = useNavigation<useNavigationType>();

  const [showWait, setShowWait] = useState<boolean>(false);
  const ifShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const ifShowPassword2 = useCallback(() => {
    setShowPassword2(!showPassword2);
  }, [showPassword2]);

  const toLogin = useCallback(() => {
    navigation.replace('Login');
  }, [navigation]);

  const ToRegister = useCallback(() => {
    if (account === "") {
      setMsg('账户不能为空');
      setTfSowWarn(true)
      setTimeout(() => {
        setTfSowWarn(false);
      }, 1500);
      return;
    }
    if (password === "" || password2 === "" ) {
      setMsg('密码不能为空');
      setTfSowWarn(true)
      setTimeout(() => {
        setTfSowWarn(false);
      }, 1500);
      return;
    }
    if (password !== password2) {
      setMsg('两次密码不一样');
      setTfSowWarn(true)
      setTimeout(() => {
        setTfSowWarn(false);
      }, 1500);
      return;
    }
    setShowWait(true);
    fetch('http://172.16.10.157:3000/regist', {
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
        setTimeout(() => {
          setTfSowWarn(false);
        }, 1500);
        if (result.code === 1) {
          navigation.replace('Login');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [account,password,password2]);

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
        <Input
          placeholder="请确认密码"
          leftIcon={<Icon name="lock-outline" size={20} />}
          onChangeText={value => setPassword2(value)}
          secureTextEntry={showPassword2}
          rightIcon={
            showPassword2 ? (
              <Icon onPress={ifShowPassword2} name="eye-off" size={20} />
            ) : (
              <Icon onPress={ifShowPassword2} name="eye" size={20} />
            )
          }
        />
        <View style={[styles.ButtonBox]}>
          <View style={[styles.LoginButton]}>
            <Button title={'注册'} onPress={ToRegister}></Button>
          </View>
          <View style={[styles.RegisterButton]}>
            <Text>已有账号？</Text>
            <Text onPress={toLogin} style={{color: 'blue'}}>
              登录
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
