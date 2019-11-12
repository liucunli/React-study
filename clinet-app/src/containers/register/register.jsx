import React,{Component} from 'react'
import {
    Button,
    List,
    Radio,
    InputItem,
    WhiteSpace,
    WingBlank,
    NavBar, Toast,
} from 'antd-mobile';
import {connect} from 'react-redux'
import {register} from '../../redux/active'
import Logo from "../../components/logo/logo";
import {Redirect} from "react-router-dom"

const ListItem = List.Item;

class Register extends Component{
    state = {
        username:'',
        password0:'',
        password1:'',
        type:'User'

    }
    myChange = (username,value) =>{
        this.setState({[username]:value});
    }
    register = () =>{
        this.props.register(this.state);
        let {msg} = this.props.user;
        if(msg){
            Toast.fail(msg);
        }
    }

    render() {
        const {msg,redirectTo} = this.props.user;

        if(redirectTo){
           return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>Boss招聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem placeholder={'请输出用户名'} onChange={val => (this.myChange('username',val))}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输出密码'} onChange={val => (this.myChange('password0',val))} type='password'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输出确认密码'} onChange={val => (this.myChange('password1',val))} type='password'>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='User'} onChange={val => (this.myChange('type',val.target.children))}>User</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='Boss'} onChange={val => (this.myChange('type',val.target.children))}>Boss</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button href={'/#/login'}>已有账号，立即登录</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {register}
)(Register);
