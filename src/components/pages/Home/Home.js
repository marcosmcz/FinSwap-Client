import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Link, useHistory }  from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import LoginForm from './LoginForm'

const Home = () => {
	//this is an object
	const [ login_info, setLoginInfo ] = useState({})
	const [ account_existance, setAccountExistance ] = useState(false)
	const [ error, setError ] = useState(false)
	const history = useHistory()

	const login_message = () => {
		//check if email exists
		const message = ( account_existance ) ? <p>Please check that your password is correct.</p> : <p>The email address that you've entered doesn't match any account.<Link to={`/sign-up`}> Sign up for an account.</Link></p>
		if (error) {
			return (
				<div className="Bad-Responses">
					{ message }
				</div>
			)
		}
	}

	const handleChange = (e) => {
		setLoginInfo(Object.assign({}, login_info, {[e.target.name]: e.target.value}))
	}
	console.log('login info:', login_info);

	const handleSubmit = (e) => {
		e.preventDefault()
		const login_url = `https://finswap-api.herokuapp.com/api/v1/sessions`
//		const login_url = `http://localhost:3001/api/v1/sessions`
		console.log(login_url);

		axios.post(login_url, login_info)
			.then(resp => {
				console.log('res:', resp);
				const id = resp.data.user.id
				console.log('user id:', id);
				history.push(`/users/${id}`)
			})
			.catch(error => {
				//if account exists then say the password is wrong
				//if account doesnt exist prompt them to make an account
				setError(true)
				setAccountExistance(error.response.data.account_exists)
			})

	}

    return (
		<div className="home">
			<div className = "header">
				<Header/>
			</div>
			<div className="login">
				<LoginForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					login_info={login_info}
				/>
			</div>
			{ login_message() } 
			<div className="sign-up">
				<h5>Don't have an account? Sign-up <Link to={`/sign-up`}>here.</Link></h5>
			</div>
		</div>
    )
}

export default Home
