import React, { useState, useEffect } from "react"
import axios from 'axios';
import User from './User';

const Users = () => {
	// this is an array
	const [ users, setUsers ] = useState([])
	const user_url = `https://finswap-api.herokuapp.com/api/v1/users.json`
//	const user_url = `http://localhost:3001/api/v1/users.json`
	
	useEffect(()=> { 
		axios.get(user_url)
		.then( resp => {
			setUsers(resp.data.data)
		})
		.catch( resp => console.log(resp) )
	}, [users.length]) // [users.lengths] determines when to change the effecti.e. when a new user is added we render again.

	const users_list  = users.map( item => { 
		return (
			<User
				key={item.attributes.email}
				attributes={item.attributes}
			/>
		)
	}) 

    return (
		<div className="home">
			<div className = "header">
				<h1>FinSwap</h1>
				<div className="subheader">Teaching Assistants.</div>
			</div>
			<div className="grid">
				{users_list} 
			</div>
		</div>
    )
}

export default Users
