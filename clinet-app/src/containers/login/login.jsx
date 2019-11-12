import React,{Component} from 'react'
import {
    Button,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    NavBar
} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Logo from "../../components/logo/logo";
import {login} from '../../redux/active'
import {Redirect} from 'react-router-dom'

class Login extends Component{
    state = {
        username:'',
        password:'',
    }
    myChange = (username,value) =>{
        this.setState({[username]:value});
    }
    login = () =>{
        this.props.login(this.state);
    }
    render() {
        const {redirectTo} = this.props.user;
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
                        <InputItem placeholder={'请输出密码'} onChange={val => (this.myChange('password',val))} type='password'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                       {/* <Link to={'/register'}>*/}
                       <Button href={'/#/register'}>还没账号，立即注册</Button>
                        {/*</Link>*/}
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
