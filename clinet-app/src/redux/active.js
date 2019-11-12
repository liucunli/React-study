import {reqRegister,reqLogin} from '../api/index'
import {SUCCESS,ERROR,UPDATE,RESET} from "./active-type";
import axios from 'axios'

//同步active
const success = (user) =>({type:SUCCESS,data:user});
const error = (message) =>({type:ERROR,data:message});
const update_user = (user) => ({type:UPDATE,data:user});
const reset_user = (msg) => ({type:RESET,data:msg});

const urlRegister = '/register';
const urlLogin = '/login';
const urlUpdate = '/update';
const urlGetUser = '/user';

//异步active,register
export const register = (user={'ss':'sss'}) =>{
    const {username,password0,password1,type} = user;
    if(!username){
            return error("用户名不能为空");
    }
    else if(!password0||!password1){
        return error("密码不能为空");
    }
    else if(password0 !== password1){
        return error("密码不一致");
    }
    else{
        const user = {username,password:password0,type};
        return dispatch =>{
            axios.post(urlRegister,user).then(response=>{
                console.log(response);
                const data = response.data;
                const code = data.code;
                if(code === 1){
                    dispatch(success(data.data));
                } else if(code === 0){
                    dispatch(error(data.message));
                }
            })
        }
    }
}

//异步active,login
export const login = (user) =>{
    const {username,password,type} = user;
    if(!username){
        return error("用户名不能为空");
    }
    else if(!password){
        return error("密码不能为空");
    }
    else {
        return (dispatch => {
            axios.post(urlLogin, user).then(response => {
                const data = response.data;
                const code = data.code;
                if (code === 1) {
                    dispatch(success(data.data));
                } else if (code === 0) {
                    dispatch(error(data.message));
                }
            })
        })
    }
}

//异步更新数据
export const async_update = (user) =>{
    return (dispatch => {
        axios.post(urlUpdate,user).then(response => {
            const data = response.data;
            const code = data.code;
            if(code === 1){
               dispatch(update_user(data.data));
            } else if(code === 0){
                dispatch(reset_user(data.msg));
            }
        })
    })
}

//异步获取数据
export const async_getUser = () =>{
    return (dispatch) => {
        axios.post(urlGetUser).then(response => {
            const data = response.data;
            const code = data.code;
            if(code === 1){
                dispatch(update_user(data.data));
            } else if(code === 0){
                dispatch(reset_user(data.msg));
            }
        })
    }
}
