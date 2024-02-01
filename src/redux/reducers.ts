import {combineReducers} from 'redux';
import { userAction, userInfo } from '../../utils';


const initUserInfo:userInfo = {
    userId : ""
}

function UserInfo(state = initUserInfo,{type,data}:userAction){
    switch(type){
        case "LOGIN":
            return {
                userId : data,
            }
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    UserInfo,
});
export default rootReducer
