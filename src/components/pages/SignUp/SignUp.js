import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useHistory }  from 'react-router-dom';
import SignUpForm from './SignUpForm'

const SignUp = () => {
	const [ user, setUser ] = useState({})
	const [ error, setError ] = useState(false)
	const [ email_message, setEmailMessage ] = useState("")
	const [ password_message, setPasswordMessage ] = useState("")
	const history = useHistory()

	const registration_message = () => {
		const email_mess = ( email_message != null ) ? <p>This email { email_message }. Please use another one.</p> : <p></p>
		const password_mess = ( password_message != null ) ? <p>Password Confirmation { password_message }. Please make sure they match.</p> : <p></p>
		if (error) {
			return (
				<div className="Bad Responses">
					{ email_mess }
					{ password_mess }
				</div>
			)
		}
	}

	const handleChange = (e) => {
		setUser(Object.assign({}, user, {[e.target.name]: e.target.value}))
//		console.log('singup info:', user);
	}

//	console.log('sign up info:', user);
	
	const handleSubmit = (e) => {
		e.preventDefault()
		//this psuedo changes the name so that we can send a 
		//nested json to the back end in the appropriate format
		const signup_info = {user}
//		const signup_url = `https://finswap-api.herokuapp.com/api/v1/users`
		const signup_url = `http://localhost:3001/api/v1/users`

		axios.post(signup_url, signup_info)
			.then(resp => {
				//go to home page
				history.push("/")
			})
			.catch(error => {
				//if error set the messages states
				setError(true)
				setEmailMessage(error.response.data.error.email)
				setPasswordMessage(error.response.data.error.password_confirmation)
			})
	}

    return (
		<div className="sign-up">
				<SignUpForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					signup_info={user}
				/>
			{ registration_message() } 
		</div>
    )
}

export default SignUp
