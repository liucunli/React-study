import React,{Component} from 'react'
import {HashRouter,Route,Switch,} from 'react-router-dom'
import Main from "./main/main";
import Register from "./register/register";
import Login from "./login/login";


export default class App extends Component{

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route component={Main}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}
