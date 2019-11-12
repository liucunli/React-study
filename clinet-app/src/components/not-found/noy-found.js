import React,{Component} from 'react'
import {Button} from "antd-mobile";
export default class NotFound extends Component{
    render() {
        return (
            <div>
                <h1>Not Found</h1>
                <Button type={'primary'} onClick={
                    this.props.history.replace('/')
                }>
                    回到首页
                </Button>
            </div>
        )
    }
}