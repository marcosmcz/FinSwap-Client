import React from 'react'
import { BrowserRouter as Router, Link }  from 'react-router-dom';

const Header = (props) => {
	return (
		<div className="wrapper">
			<h1>Welcome to Fin-Swap! </h1>
			<h3>Fin-Swap is where teaching assistants can swap exam invigilations duties with other TAs that best meet their own final exam schedules.</h3>
			<h5>If you would like to know more about how Fin-Swap works click <Link to={`/about`}>here.</Link></h5>
		</div>
	)
} 

export default Header
