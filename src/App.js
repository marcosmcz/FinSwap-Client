//this is equivalent to rails-api javascript/packs/index.js from that
//react-rails video
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter"


function App() {
  return (
      <Router>
        <AppRouter />
      </Router>
  )
}
export default App;
