import React,{Component} from 'react'
import logo from './logo.png'
import './logo.less'
export default class  extends Component{
    render() {
        return (
            <div alt={'logo'} className='logo_box'>
                <img className='logo' src={logo}/>
            </div>
        )
    }
}