// this is localhost:3000/users/
// and will have all info from Header and Own
import React, { useState, useEffect, Fragment } from 'react'
import { BrowserRouter as Router, Link }  from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import Own from './Own'
import Want from './Want'
import Form from './Form'
import Match from './Match'

const User = (props) => {
	const user_id = props.match.params.user_id
	//this is an object
	const [ user, setUser] = useState({})
	//this is an array
	const [ ta_courses_pref, setTaCourseContent] = useState([])
	const [ loaded, setLoaded] = useState(false)
	const [ exams, setExams] = useState([])
	const [ wants, setWants] = useState({})
	const [ owns, setOwns] = useState({})
	const [ matches, setMatches ] = useState([])
	//set this to true when algo has run
	const [ algo_ran, setAlgoRan ] = useState(false)

	useEffect(() => {
//		const user_url = `https://finswap-api.herokuapp.com/api/v1/users/${user_id}`
//		const exams_url = `https://finswap-api.herokuapp.com/api/v1/exams.json`
//		const matches_url = `https://finswap-api.herokuapp.com/api/v1/matches/${user_id}`
		// we want the user_url to be like /users/1
		const user_url = `http://localhost:3001/api/v1/users/${user_id}`
		const exams_url = `http://localhost:3001/api/v1/exams.json`
		const matches_url = `http://localhost:3001/api/v1/matches/${user_id}`
		const algo_url = `http://localhost:3001/api/v1/algorithms.json`

		//get user info
		axios.get(user_url)
			//get user data
			.then(resp => {
				setUser(resp.data)
				console.log(resp.data);
				setTaCourseContent(resp.data.included)
				setLoaded(true)
			})
			.catch(resp => {
			})

		//get algo info
		axios.get(algo_url)
			.then(resp => { 
				setAlgoRan(resp.data.data[0].attributes.run)
			})
			.catch(resp => {
			})

		//get exam info
		axios.get(exams_url)
			.then(resp => { 
				setExams(resp.data.data)
			})
			.catch(resp => {
			})

		//get matches info
		axios.get(matches_url)
			.then(resp => { 
				setMatches(resp.data.data)
//				console.log('tem', resp.data.data);
//				console.log('matches:',matches);
//				console.log('match cycles:',resp.data.data);
			})
			.catch(error => {
				console.log(error)
			})
	}, [algo_ran])

	// exam lists to best used in each drop down menu
	//BUG:find way to make both exam lists depend on eachother
	//and update the differnece when the other is changed
	var exams_list_owns  = exams.map( item => ({
		label : item.attributes.course_code,
		value : item.attributes.course_code
	})) 
	var exams_list_wants  = exams.map( item => ({
		label : item.attributes.course_code,
		value : item.attributes.course_code
	})) 

	const courses_user_matched_on = (user_id) => {
		const courses = matches.filter( item => item.attributes.user_id == user_id).map(item => ({ course_match_info:  item.attributes }))
		return courses
	}


	const pref_list = (pref) => {
		const prefs_list = ta_courses_pref.filter(item => item.type.includes(pref)).map( item => ({ key : item.id, values : item.attributes }))
			return prefs_list
	}

	const pref_style_list = (pref) => {
		var Pref = (pref == 'want') ? Want : Own;
		return pref_list(pref).map( item => {
			//this returns an object
			return (
				<Pref
					key = {item.key}
					values = {item.values}
				/>
			)
		}) 
	}

	var change_counter = 0

//	console.log('current wants:', wants);
//	console.log('current owns:', owns);
	const handle_change = (pref) => {
		//when change is made, we subtract that element from a global exams list that the other form uses
		var setPrefState = (pref == 'want') ? setWants : setOwns;
		var prefState = (pref == 'want') ? wants : owns;
//		console.log(change_counter);
//		console.log('pref:',pref,', prefstate:',  prefState);
		const handleChange = (e) => {
			//e is an array
			if (e != null) {
				const pref_courses = e.map(item => ({user_id: Number(props.match.params.user_id), course_code : item.value}))
				setPrefState(pref_courses)
//				console.log('change state:', prefState);
//				console.log(change_counter);
			}
			else{
				//when all are deleted, state has last course to be deleted
				//we want to clear the state in this case
//				console.log('e is null and state has one elemnt:',prefState );
				setPrefState({})
				//BUG: if no changes were made and button clicked this gets a called and everything is deleted
			}
		}
		change_counter++
		return handleChange
	}

	const pref_ids = (pref) => pref_list(pref).map(want_id => want_id.key)

	const handle_submit = (pref) => {
			//hack solution:delete all wants/owns for that user
			//and just add whatever they added in that field
			//post the course code
		var prefState = (pref == 'want') ? wants : owns;
		const pref_name = (pref == 'want') ? 'wants' : 'owns';
//		const base_url = 'https://finswap-api.herokuapp.com/api/v1/' + pref_name
		const base_url = 'http://localhost:3001/api/v1/' + pref_name
		const handleSubmit = (e) => {
			for (var i = 0; i < pref_ids(pref).length; i++) {
				var pref_id = pref_ids(pref)[i]
//				console.log(pref_id);
				axios.delete(base_url + '/' + pref_id)
					.then(resp => {
						debugger
					})
					.catch(resp => {})
			}
			for (var i = 0; i < prefState.length; i++) {
				axios.post(base_url, prefState[i])
					.then(resp => {
						debugger
					})
					.catch(resp => {})
			}
		}
		return handleSubmit
	}

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
						{ pref_style_list('own') } 
						<br></br>
						<Form
							/*these are the inputs*/
							pref_type={'own'}
							handleChange={handle_change('own')}
							handleSubmit={handle_submit('own')}
							exams_list={ exams_list_owns }
							ta_course_content={ pref_list('own') }
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
						{ pref_style_list('want') } 

					<br></br>
						<Form
							/*these are the inputs*/
							pref_type={'want'}
							handleChange={handle_change('want')}
							handleSubmit={handle_submit('want')}
							exams_list={ exams_list_wants }
							ta_course_content={ pref_list('want') }
							/*this is the target values to be saved*/
							ta_pref={wants}
						/>
						<br></br>
					</div>
					<div className="column">
						<Match
							courses_matched={courses_user_matched_on(user_id)}
							matches_cycle={matches}
							algo_state={algo_ran}
						/>
					</div>
				</Fragment>
			}
		</div>
	)
}

export default User
