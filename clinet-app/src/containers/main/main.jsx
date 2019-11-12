import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import BossInfo from '../boss-info/boss-info'
import UserInfo from '../user-info/user-info'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import {getRoute} from "../../utils";
import {async_getUser} from "../../redux/active";
import Boss from './boss/boss';
import User from './user/user';
import Message from './message/message';
import Personal from './personal/personal'
import {NavBar} from "antd-mobile";
import NavFooter from "../../components/nav-footer/nav-footer";


class Main extends Component{
    navList = [
        {
            path: '/main/user', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/main/boss', // 路由路径
            component: User,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/main/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/main/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }]

    componentDidMount() {
        const userid = Cookie.get('userid');
        const id = this.props.user._id;
        if(userid && !id){
            this.props.async_getUser()
        }
    }

    render() {
        //获取cookie
        let userid = Cookie.get('userid');
        //判断cookie是否存在
        //不存在跳到login界面
        if(!userid){
            return <Redirect to={'/login'}/>
        }
        //读取user的状态
        let {user} = this.props;
        if(!user._id){
            return null;
        } else {
            //如果有id，需要显示相应的界面
            let path = this.props.location.pathname;
            if(path === '/'){
                console.log(user);
                path = getRoute(user.type,user.header);
                return <Redirect to={path}/>
            }

        }

        //debugger;
        /*
        根据返回的数据，重定向地址
        * */
        const {header,type} = this.props.user;
        if(header){
            let path = '';
            if(type === 'Boss'){
                path = '/main/boss'
            } else {
                path = '/main/user'
            }
            return <Redirect to={path}/>
        }

        const currentNav = this.navList.find(nav => nav.path == this.props.location.pathname)
        return (

            <div>
                {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {this.navList.map(nav => <Route path={nav.path} component={nav.component}/>)}
                    <Route path={'/main/bossInfo'} component={BossInfo}/>
                    <Route path={'/main/userInfo'} component={UserInfo}/>
                </Switch>
                {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {async_getUser}
)(Main)