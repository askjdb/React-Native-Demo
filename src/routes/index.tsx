import React from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import Setting from '../Pages/Setting';
import User from '../Pages/User';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
export default function Index() {
  return (
    <View style={[styles.concenter]}>
      <Tab.Navigator
        initialRouteName={'Setting'}
        screenOptions={({route}) => ({
          tabBarLabel: props => {
            const {focused, color} = props;
            let title = '';
            if (route.name === 'Home') {
              const name = focused ? 'add-circle-outline' : 'add-circle';
              return (
                <View>
                  <Ionicons name={name} color={color} size={26} />
                  <Text>首页</Text>
                </View>
              );
            } else if (route.name === 'Setting') {
              return (
                <View>
                  <Ionicons
                    name={focused ? 'apps-outline' : 'apps'}
                    color={color}
                    size={26}
                  />
                  <Text>设置</Text>
                </View>
              );
            } else if (route.name === 'User') {
              return (
                <View>
                  <Ionicons
                    name={focused ? 'accessibility' : 'accessibility-sharp'}
                    color={color}
                    size={26}
                  />
                  <Text>用户</Text>
                </View>
              );
            }
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: '首页',
            headerStyle: {
              backgroundColor: 'tomato',
            },
            headerRight: () => {
              return <Text>Hello</Text>;
            },
            headerTintColor: '#ffff',
            headerShown: false,
          }}></Tab.Screen>
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            title: '设置',
            headerTintColor: '#ffff',
            headerShown: false,
          }}></Tab.Screen>
        <Tab.Screen
          name="User"
          component={User}
          options={{
            title: '用户',
            headerTintColor: '#ffff',
            headerShown: false,
          }}></Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  concenter: {
    flex: 1,
  },
});
