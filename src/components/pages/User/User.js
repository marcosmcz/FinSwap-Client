// this is localhost:3000/users/
// and will have all info from Header and Own
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Link }  from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import Own from './Own'
import Want from './Want'
import Form from './Form'

const User = (props) => {
	//this is an object
	const [ user, setUser] = useState({})
	//this is an array
	const [ ta_courses_pref, setTaCourseContent] = useState([])
	const [ loaded, setLoaded] = useState(false)
	const [ exams, setExams] = useState([])
	const [ wants, setWants] = useState({})
	const [ owns, setOwns] = useState({})

	useEffect(() => {
		// we want the user_url to be like /users/1
		const userID = props.match.params.user_id
		const user_url = `http://localhost:3001/api/v1/users/${userID}`
		const exams_url = `http://localhost:3001/api/v1/exams.json`

		//get user info
		axios.get(user_url)
			//get user data
			.then(resp => {
				setUser(resp.data)
				setTaCourseContent(resp.data.included)
				setLoaded(true)
			})
			.catch(resp => console.log(resp))
		//get exam info
		axios.get(exams_url)
			.then(resp => { 
				setExams(resp.data.data)
			})
			.catch(resp => console.log(resp))
	}, [])

	const exams_list  = exams.map( item => ({
		label : item.attributes.course_code,
		value : item.attributes.course_code
	})) 


	const want_list = ta_courses_pref.filter(item => item.type.includes("want")).map( item => ({ key : item.id, values : item.attributes }))

	const own_list = ta_courses_pref.filter(item => item.type.includes("own")).map( item => ({ key : item.id, values : item.attributes }))

	const want_style_list = want_list.map( item => {
		//this returns an object
		return (
		<Want
			key = {item.key}
			values = {item.values}
		/>
		)
	}) 

	const own_style_list = own_list.map( item => {
		//this returns an object
		return (
		<Own
			key = {item.key}
			values = {item.values}
		/>
		)
	}) 

	const handleChange_want = (e) => {
		//e is an array
		if (e != null) {
			const want_courses = e.map(item => ({user_id: Number(props.match.params.user_id), course_code : item.value}))
			setWants(want_courses)
		}
	}
	const handleChange_own = (e) => {
		//e is an array
		if (e != null) {
			const own_courses = e.map(item => ({user_id: Number(props.match.params.user_id), course_code : item.value}))
			setOwns(own_courses)
		}
	}


	const want_ids = want_list.map(want_id => want_id.key)
	const own_ids = own_list.map(own_id => own_id.key)
	const handleSubmit_want = (e) => {
//		const csrfToken = document.querySelector('[name=csrf-token]').content
//		axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

		//hack solution:delete all wants for that user
		//and just add whatever they added in that field
		//post the course code
		for (var i = 0; i < want_ids.length; i++) {
			var want_id = want_ids[i]
			axios.delete(`http://localhost:3001/api/v1/wants/${want_id}`)
				.then(resp => {
					debugger
				})
				.catch(resp => {})
		}
		for (var i = 0; i < wants.length; i++) {
			axios.post('http://localhost:3001/api/v1/wants', wants[i])
				.then(resp => {
					debugger
				})
				.catch(resp => {})
		}
	}
	const handleSubmit_own = (e) => {
//		const csrfToken = document.querySelector('[name=csrf-token]').content
//		axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

		//hack solution:delete all wants for that user
		//and just add whatever they added in that field
		//post the course code
		for (var i = 0; i < own_ids.length; i++) {
			var own_id = own_ids[i]
			axios.delete(`http://localhost:3001/api/v1/owns/${own_id}`)
				.then(resp => {
					debugger
				})
				.catch(resp => {})
		}
		for (var i = 0; i < owns.length; i++) {
			axios.post('http://localhost:3001/api/v1/owns', owns[i])
				.then(resp => {
					debugger
				})
				.catch(resp => {})
		}
	}
	//get button type

	return (
		<div className="wrapper">
			{
				loaded &&
				<Fragment>
					<div className="column">
						<Header
							attributes={user.data.attributes}
						/>
					</div>
					<div className="list">
		<h3>You have these courses that you would like to switch with someone:</h3>
						{ own_style_list } 
						<br></br>
						<Form
							/*these are the inputs*/
							handleChange={handleChange_own}
							handleSubmit={handleSubmit_own}
							exams_list={ exams_list }
							ta_course_content={ own_list }
							/*this is the target values to be saved*/
							ta_pref={owns}
						/>
					</div>
					<br></br>
					<div className="column">
					</div>
					<br></br>
					<div className="list">
		<h3>These are the courses that you would like to switch with someone:</h3>
						{ want_style_list } 

					<br></br>
						<Form
							/*these are the inputs*/
							handleChange={handleChange_want}
							handleSubmit={handleSubmit_want}
							exams_list={ exams_list }
							ta_course_content={ want_list }
							/*this is the target values to be saved*/
							ta_pref={wants}
						/>
						<br></br>
					</div>
					<div className="column">
					</div>
				</Fragment>
			}
		</div>
	)
}

export default User
