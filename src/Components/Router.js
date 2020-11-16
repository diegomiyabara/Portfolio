import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home/index'

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router