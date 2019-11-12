import {combineReducers} from 'redux'
import {SUCCESS,ERROR,UPDATE,RESET} from "./active-type";
import {getRoute} from "../utils";

let initState = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
function user(state=initState,active) {
    switch (active.type) {
        case SUCCESS:
            const {type,header} = active.data;
            return {...active.data,redirectTo:getRoute(type,header)};
        case ERROR:
            return {msg:active.data};
        case UPDATE:
            return active.data;
        case RESET:
            return {...initState,msg:active.data};
        default:
            return state;
    }
}


export default combineReducers({
    user
})