//this is equivalent to rails-api javascript/components/App.js from that
//react-rails video
import React from "react"
import { Route, Switch } from "react-router-dom"
import Users from "./components/pages/Users/Users"
import User from "./components/pages/User/User"
import Form from "./components/pages/User/Form"

const AppRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Users}/>
        <Route exact path="/users/:user_id" component={User}/>
        <Route exact path="/users/:user_id/course-form" component={Form}/>
      </Switch>
    </div>
  )
}

export default AppRouter
