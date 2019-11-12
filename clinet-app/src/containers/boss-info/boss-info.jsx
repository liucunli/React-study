import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import HeaderSelector from "../../components/header-selector/header-selector";
import {async_update} from "../../redux/active";
import {Redirect} from 'react-router-dom'

class BossInfo extends Component{
    state = {
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: 0 // 工资
    }
    textHandle = (key,value) => {
        this.setState({[key]:value});
    }
    save = () => {
        this.props.async_update(this.state);
    }
    setHeader = (header) => {
        this.setState({header:header});
    }
    render() {
        return (
            <div>
                <NavBar>boss信息完善</NavBar>
                <HeaderSelector setHeader = {this.setHeader}/>
                <InputItem onChange={val => this.textHandle('post',val)}>招聘职位</InputItem>
                <InputItem onChange={val => this.textHandle('company',val)}>公司名称</InputItem>
                <InputItem onChange={val => this.textHandle('salary',val)}>职位薪资</InputItem>
                <TextareaItem  onChange={val => this.textHandle('info',val)} title={'职位要求'} rows={3}/>
                <Button type={'primary'} onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {async_update}
)(BossInfo)