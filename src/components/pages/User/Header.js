import React from 'react'

const Header = (props) => {
	const {email, user_id} = props.attributes
	return (
		<div className="wrapper">
			<h1>TA email: {email}</h1>
		</div>
	)
} 

export default Header
