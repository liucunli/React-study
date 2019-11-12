import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import {async_update} from "../../redux/active";
import {Redirect} from 'react-router-dom'

class UserInfo extends Component{

    state = {
        header:'',
        post: '', // 职位
        info: '', // 个人或职位简介
    }
    textHandle = (key,value) =>{
        this.setState({[key]:value});
    }
    setHeader = (header) => {
        this.setState({header:header});
    }
    save = () => {
        this.props.async_update(this.state);
    }

    render() {

        return (
            <div>
                <NavBar>user信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem onChange={val => this.textHandle('post',val)}>求岗职位</InputItem>
                <TextareaItem  onChange={val => this.textHandle('info',val)} title={'个人介绍'} rows={3}/>
                <Button onClick={this.save} type={'primary'} >保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {async_update}
)(UserInfo)