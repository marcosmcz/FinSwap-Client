//this is equivalent to rails-api javascript/components/App.js from that
//react-rails video
import React from "react"
import { Route, Switch } from "react-router-dom"
import Users from "./components/pages/Users/Users"
import User from "./components/pages/User/User"
import Form from "./components/pages/User/Form"
import Home from "./components/pages/Home/Home"
import About from "./components/pages/Home/About"
import SignUp from "./components/pages/SignUp/SignUp"

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/sign-up" component={SignUp}/>
        <Route exact path="/users/:user_id" component={User}/>
        <Route exact path="/all-users" component={Users}/>
      </Switch>
    </div>
  )
}

export default AppRouter
