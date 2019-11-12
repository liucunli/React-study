import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

const img_length = 20;
export default class HeaderSelector extends Component{
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    state = {
        header:null
    }
    handle = ({icon,text}) =>{
        this.setState({header:icon});
        this.props.setHeader(text);
    }
    constructor(props){
        super(props);
        this.headerList = [];
        for(let i=0;i<img_length;i++){
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`./images/头像${i+1}.png`)
            })
        }
    }
    render() {
        let listHeader = this.state.header?(<div>已选择头像<img src={this.state.header}/></div>):'请选择头像：';
        return (
            <div>
                <List renderHeader={() => listHeader}/>
                <Grid onClick={this.handle} data={this.headerList} columnNum={5}/>
            </div>
        )
    }
}