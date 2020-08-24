import React from 'react'

const Match = (props) => {
	//array of the matches/cycle
	const matches_cycle = props.matches_cycle 
	//array of info of the courses that the TA matched on (info of owns)
	const courses_matched = props.courses_matched;
	//arry of course codes the ta matched on
	const courses_matched_codes = courses_matched.map( item => ([
		item.course_match_info.course_own
	]))
	//the own, want pair in each match
	const match_pairs = courses_matched.map( item => ([
		item.course_match_info.course_own, item.course_match_info.course_want
	]))

	//method to group an array of objects by a property of an array of
	//nested objects
	const groupItemBy = (array, property) => {
	  var hash = {};
	  for (var i = 0; i < array.length; i++) {
		if (!hash[array[i][property]]) hash[array[i][property]] = [];
		hash[array[i][property]].push(array[i]);
	  }
	  return hash;
	}
	//group the matches_cycles by cycle_id
	const matches_grouped_by_cycle = Object.values(groupItemBy(matches_cycle
		.map(item => item.attributes),'cycle_id'))

	console.log('matches cycle:', matches_cycle);
	console.log('courses matched :', courses_matched);
	console.log('course codes matched:', courses_matched_codes);
	console.log('course match pair:', match_pairs);
	console.log('matches grouped by cycle id;', matches_grouped_by_cycle);

	//print the courses the ta matched with
	const check_match = (course_matched) => {
		if (courses_matched.length > 0) {
			return (
				<h2>Congrats! You got a match for your course(s): { courses_matched_codes.join(', ') }. </h2>
			)
		}
		else{
			return <h2>Oh no! You did not get any matches :(</h2>
		}
	}

	const matching_info = () => {
		//within each grouped cycle of matches do:
		//note: |matches_grouped_by_cycle|==|courses_matched|
		// ==|courses_matched|
		var instructions = []
		for(var i = 0; i < matches_grouped_by_cycle.length; i++){
			//get the grouped cycle
			const cycle_group = matches_grouped_by_cycle[i]
			//get the ta email that they will give their course to
			//i.e ta_give_email from courses_matched
			const ta_email_give = courses_matched[i].course_match_info.ta_give_email
			//get the ta email that they will get their course from
			//i.e ta_get_email from courses_matched
			const ta_email_get = courses_matched[i].course_match_info.ta_get_email
			//get the matched pair of courses
			const matched_course_pair = match_pairs[i]
			//get the emails of all tas in that cycle
			const ta_emails_in_cycle = []
			cycle_group.forEach((item) => {
				ta_emails_in_cycle.push(item.ta_email);
			})
			instructions.push(
				<div className="matching-info">
					<hr></hr>
				<p>Our algorithm says that you can swap your course {matched_course_pair.join(' for your desired course ')}.</p>
					<p>For this exchange to occur, our algorithm joined the following TAs in a group to swap courses in a chain: </p>
					<p>{ta_emails_in_cycle.join(' --- ')}</p>
					<p>This means that you should email { ta_email_give } to give them your course { matched_course_pair[0] }, and you should expect an email (but you should also email them to confirm) from { ta_email_get } who will give you your desired course { matched_course_pair[1] }.</p>
				</div>
			)
		}
		return instructions
	}

	return (
		// temp holder for owns
		<div className="card">
			{ check_match(courses_matched) } 
			{ matching_info() } 
		</div>
	)
} 

export default Match
