import React from 'react'

const LoginForm = (props) => {
	const handleSubmit = props.handleSubmit
	const handleChange = props.handleChange
	const email = props.login_info.email
	const password = props.login_info.password

	return (
		<form onSubmit={handleSubmit}>
			<h5>Sign in:</h5>
		  <label htmlFor="email">Email    </label>
		  <input
			type="text"
			name="email"
			value={email}
			required="required"
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
		  <button type="submit">
			Login
		  </button>

		</form>
	  );
}

export default LoginForm
