import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputKeyPressEventData,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

/**
 * 各个路由进行路由传参的时候传递参数的类型
 */
export type RootStackParamList = {
  Home?: {} | undefined;
  Profile?: {userId: string} | undefined | {};
  Login?: undefined;
  Register?: undefined;
  Index?: undefined;
  ChatPage: {userId: string};
  ChatItem:any;
  User:undefined
};
export type RootStackParamListKey = keyof RootStackParamList;

/**
 * SubmitEdit回调的Props的类型
 */
export type SubmitEditType =
  NativeSyntheticEvent<TextInputSubmitEditingEventData>;

/**
 * keyPress回调的Props的类型
 */
export type KeyPressType = NativeSyntheticEvent<TextInputKeyPressEventData>;

/**
 * 路由组件使用需要的useNavigation的泛型
 */
export type useNavigationType<T extends RootStackParamListKey> =
  StackNavigationProp<RootStackParamList, T>;

/**
 * 路由组件使用需要的useRoute的泛型
 */
export type useRouteType<T extends RootStackParamListKey> = RouteProp<
  RootStackParamList,
  T
>;

/**
 * 用户信息类型
 */
export interface userInfo {
  userId: string;
}
/**
 * 用户的Action的类型
 */
export interface userAction {
  type: string;
  data: userInfo;
}

/**
 * state的类型
 */
export interface RootState {
  UserInfo: userInfo;
}


/**
 * 聊天记录
 */
export type content = {
    from:string,
    to:string,
    content:string,
} 

/**
 * 聊天记录的Action
 */
export type contentAction = {
    type:string,
    data:content,
}