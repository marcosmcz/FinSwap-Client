import React from 'react'
import { BrowserRouter as Router, Link }  from 'react-router-dom';

const About  = (props) => {
	return (
		<div className="wrapper">
			<h1>How Fin-Swap Works</h1>
			<h3>Fin-Swap is an abreviation for Finals Swap. Fin-Swap is meant to bring together TAs in groups to exchange exam invigilation duties. </h3>
			<h5>The Problem:</h5>
			<p>	The status quo method to swap exam invigilation duties is to go on Moodle and hope to find someone that can exchange duties with you. The problem is that often times, despite them having the exam you want, you do not have the exam they want: the classic coincidence of wants problem. In turn, the exchange does not occur and you are stuck with an exam invigilation duty the night before your massive MATH 6620 final exam and you barely understand that weird Dirichlet change of variables question (let alone proving those black magic measure theory questions). </p>
			<h5>The Insight:</h5>
			<p>During a previous exam period I wanted to swap an exam invigilations but could not find another TA to swap with. I did however find two TAs in that we could all come together and exchange exams (alas they did understand my franctic 3AM email trying to get them to enter this exchange).  Even though a swap could not occur between two people it could occur if three or more people, under the correct circumstances, came together forming a chain of exchanges!</p>
			<h5>The Solution:</h5>
			<p>By matching groups of TAs, the Fin-Swap algorithm can allow for transactions of exam invigilations to occur which would not of occured otherwise as trying to determine the correct people to form these groups is a rather complex task (not to mention a pain to do in Moodle).</p>
			<h5>The Example:</h5>
			<p>Imagine three TAs: Neil, Ralph and Jasmine. Neil has to invigilate MATH205 but wants to invigilate MATH210 as it works better for his schedule. Ralph has MATH210 and wants MATH203. Similarly, Jasmine has MATH203 and wants MATH205.</p>
			<p>Now imagine Neil goes on Moodle hopping to find someone to swap courses with and finds that Ralph posted that he is also looking to swap courses. Unfortunately, these two lads cannot swap as even though Ralph has the course Neil wants, Neil does not have the course that Ralph wants. </p>
			<p>However! These three are a bright bunch and go on Fin-Swap which matches them in a group and a swap is possible.</p>
			<p>The exchange is as such: Neil gives Jasmine MATH205, Ralph gives Neil MATH210 and Jasmine gives Ralph MATH203.</p>
			<p>By entering into this "cycle" of swaps, Neil, Jasmine and Ralph received the exam invigilations duties they wanted.</p>
			<h5>The Big Picture:</h5>
			<p>The Fin-Swap algorithm is not limited to groups of only three people. Indeed, it can find groups of any size that allow for swaps to occur! The goal of Fin-Swap is to make the lives of TAs a little bit better durring exams seasons.</p>
		</div>
	)
} 

export default About
