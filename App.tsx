// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Index from './src/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Pages/Login';
import Register from './src/Pages/Register';
import Chatpage from './src/Pages/Chatpage';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {createContext, useState} from 'react';

export const USERID = createContext((userId: string) => {});

const stack = createNativeStackNavigator();

function App() {
  const [userID, setUserID] = useState<string>('');
  const getUserId = (userid: string) => {
    setUserID(userid);
  };
  return (
    <Provider store={store}>
      <USERID.Provider value={getUserId}>
        <NavigationContainer>
          <stack.Navigator
          >
            <stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '登录',
                headerTitleAlign: 'center',
              }}></stack.Screen>
            <stack.Screen
              name="Register"
              component={Register}
              options={{
                title: '注册',
                headerTitleAlign: 'center',
              }}></stack.Screen>
            <stack.Screen
              name="Index"
              component={Index}
              options={{
                title: 'Boss直聘',
                headerTitleAlign: 'center',
              }}></stack.Screen>
            <stack.Screen
              name="ChatPage"
              component={Chatpage}
              options={{
                title: `${userID}`,
                headerTitleAlign: 'center',
              }}></stack.Screen>
          </stack.Navigator>
        </NavigationContainer>
      </USERID.Provider>
    </Provider>
  );
}
export default App;
