import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {store} from '../store/store';
import { Route,BrowserRouter, Switch} from 'react-router-dom'
import Index from '../page/Index/app';
import Detail from '../page/Detail/index';
import AnimatedRouter from 'react-animated-router';
import 'react-animated-router/animate.css'; 
class RouterComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AnimatedRouter>
                        <Switch>
                            <Route exact path="/" component={Index} />
                            <Route path="/detail/:id" component={Detail} />
                        </Switch>
                    </AnimatedRouter>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default RouterComponent;