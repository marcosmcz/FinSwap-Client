import React from 'react'

const SignUpForm = (props) => {
	console.log('sign up info form:', props);
	const handleSubmit = props.handleSubmit
	const handleChange = props.handleChange
	const email = props.signup_info.email
	const password = props.signup_info.password
	const password_confirmation = props.signup_info.password_confirmation

	return (
		<form onSubmit={handleSubmit}>
			<h5>Sign Up:</h5>
		  <label htmlFor="email">Email    </label>
		  <input
			type="text"
			name="email"
			required="required"
			value={email}
		    onChange={handleChange}
			placeholder="Enter your email"
		  />
			<label htmlFor="password">   Password   </label>
		  <input
			id="password"
			type="password"
			name="password"
			required="required"
			value={password}
			onChange={handleChange}
			placeholder="Enter your password"
		  />
			<label htmlFor="password-confirmation">   Confirm Password   </label>
		  <input
			id="password-confirmation"
			type="password"
			name="password_confirmation"
			required="required"
			value={password_confirmation}
			onChange={handleChange}
			placeholder="Re-enter your password"
		  />
		  <button type="submit">
			Sign Up
		  </button>

		</form>
	  );
}

export default SignUpForm
