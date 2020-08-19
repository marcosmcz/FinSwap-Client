import React from "react"
import { BrowserRouter as Router, Link }  from 'react-router-dom';

const User = (props) => {
	return (
		<div className="list">
			<div className="user-link">
				<Link to={`/users/${props.attributes.user_id}`}>View {props.attributes.user_id}'s TA info</Link>
			</div>
		</div>
	)
}

export default User
