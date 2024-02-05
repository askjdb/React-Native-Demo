import {combineReducers} from 'redux';
import { userAction, userInfo,content,contentAction } from '../../utils';


const initUserInfo:userInfo = {
    userId : ""
}

function UserInfo(state = initUserInfo,{type,data}:userAction){
    switch(type){
        case "LOGIN":
            return {
                userId : data.userId,
            }
        default:
            return state;
    }
}

const contentList:content[] = [];
function Contentfnc(state = contentList,{type,data}:contentAction){
    switch(type){
        case "ADD":
            return [data,...state];
        default :
        return state
    }
}


const rootReducer = combineReducers({
    UserInfo,
    Contentfnc,
});
export default rootReducer



