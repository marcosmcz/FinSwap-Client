import React from 'react'

const OwnWantForm = (props) => {
	return (
		<div className="wrapper">
			<form onSubmit={props.handleSubmit}>
				<div>
					Add the course(s) that you own and would like to swap.
				</div>
				<div className="field">
					<input onChange={props.handleChange} value={props.owns} type="text" name="Course" placeholder="Course You Own"/>
				</div>
				<button type="submit">Sublmit Your Course</button>
				<button></button>
				<div>
					Add the course(s) that you would like to invigilate.
				</div>
				<div className="field">
					<input onChange={props.handleChange}type="text" name="Course" placeholder="Course You Want"/>
				</div>
				<button type="submit">Sublmit Your Course</button>
			</form>
		</div>
	)
}

export default OwnWantForm
