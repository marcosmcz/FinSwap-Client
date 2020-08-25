import React from 'react'

const Header = (props) => {
	const {email, user_id} = props.attributes
	return (
		<div className="wrapper">
			<h2>Your email: {email}</h2>
		</div>
	)
} 

export default Header
