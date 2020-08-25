import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom";
import Select from 'react-select';
import { components } from "react-select";

const Form = (props) => {
	const exams_list = props.exams_list
	const ta_course_content = props.ta_course_content
	const handleSubmit = props.handleSubmit
	const handleChange = props.handleChange
	const ta_preferences = props.ta_pref
	const pref_type = props.pref_type

//	console.log('pref type:', pref_type, ', ta course content:', ta_course_content);
//	console.log('pref type:', pref_type);

	const default_values = ta_course_content.map( item => ({
		label : item.values.course_code,
		value : item.values.course_code
	}))

	const Menu = menu_props => {
	  const optionSelectedLength = menu_props.getValue().length || 0;
	  return (
		<components.Menu {...menu_props}>
		  {optionSelectedLength < 3 ? (
			menu_props.children
		  ) : (
			<div style={{ margin: 15 }}>Max limit of 3 courses achieved</div>
		  )}
		</components.Menu>
	  );
	};

	const isValidNewOption = (inputValue, selectValue) =>
		inputValue.length > 0 && selectValue.length < 5;

	const determine_button = () => {
		if (Object.keys(default_values).length == 0) {
			return <button type="submit">Add a course</button>
		}
		else{
			return <button type="submit">Edit your courses</button>
		}
	}

	  return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<div className="select-fied">
				  <Select
					components={{ Menu }}
					isMulti
					isValidNewOption={isValidNewOption}
					options={exams_list}
					defaultValue={default_values}
					value={ta_preferences.course_code}
					onChange={value => handleChange(value)}
					placeholder="Select a Course"
				  />
				</div>
				<br></br>
				{ determine_button() } 
			</form>
		</div>
	  );
	}

export default Form

