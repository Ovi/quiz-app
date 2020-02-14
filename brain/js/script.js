var usernameForm = document.getElementById('username');
var uname = document.getElementById('uname');
var login = false; // not logged in
var theForm = document.getElementById('theForm');
var theQuiz = document.getElementById('theQuiz');
var pass = document.getElementById('pass');
var submitBtn = document.getElementById('submit');
var err = document.getElementById('err');
var errH = document.getElementById('errH');
var i;

/*-----------------------------------*\
$ On Body Load
\*-----------------------------------*/
function chkUser() {
	// checking from localstorage if user provided name before...
	var tempName = localStorage.getItem('name'); // get the name
	if (tempName == null || tempName == '' || tempName == 'undefined') {
		// if name doesn't exist
		usernameForm.style.display = 'block'; // ask for name
		document.getElementById('logoutBtn').style.display = 'none'; // don't show logout button
	} else {
		var tempCa = localStorage.getItem('ca'); // get previous correct answer
		var tempPer = localStorage.getItem('percentage'); // get previous percentage
		if (
			(tempPer == null || tempPer == '' || tempPer == 'undefined') &&
			(tempCa == null || tempCa == '' || tempCa == 'undefined')
		) {
			theForm.style.display = 'block'; // show the form for password
			errH.innerHTML = tempName + ', Input Your Key Again.'; // display this text
			document.getElementById('logoutBtn').style.display = 'block'; // show logout button
		} else {
			// if percentage and correct answers found
			document.getElementById('theResult').style.display = 'block';
			showResult(tempPer, tempCa);
		}
	}
}

/*-----------------------------------*\
$ Asking for name...
\*-----------------------------------*/
function askPass() {
	// when user puts name and press enter
	if (uname.value == '' || uname.value == null || uname.value == 'undefined') {
		// if nothing is input, make name "BUDDY"..
		uname.value = 'Buddy';
		localStorage.setItem('name', uname.value); // place this name in local storage
		tempName = localStorage.getItem('name'); // get the name from local storage and put in a variable
	} else {
		localStorage.setItem('name', uname.value); // place this name in local storage
		tempName = localStorage.getItem('name'); // get the name from local storage and put in a variable
	}
	usernameForm.style.display = 'none'; // hide the current form or username
	theForm.style.display = 'block'; // show the form of password
	errH.innerHTML = tempName + ', Please Provide Your Key'; // display this line with user's name
}

/*-----------------------------------*\
$ The Login System...
\*-----------------------------------*/
function typing() {
	// enable 'verify identity btn' as user starts typing
	if (pass.value != '') {
		submitBtn.removeAttribute('disabled');
		document.getElementsByClassName('finger-print')[0].style.opacity = '1';
	} else {
		submitBtn.setAttribute('disabled', 'disabled');
		document.getElementsByClassName('finger-print')[0].style.opacity = '.6';
	}
}

function chkPass(btn) {
	// checking password
	if (pass.value == 11223344) {
		// if password is correct
		pass.setAttribute('disabled', 'disabled'); // make input box disabled - just for good UX
		submitBtn.setAttribute('disabled', 'disabled'); // make input box disabled - again just for good UX

		submitBtn.innerHTML =
			'<i class="material-icons loading" style="font-size: 1.8em;">cached</i>'; // show loading icon

		login = true; // set login true

		setTimeout(function() {
			// do processing for 2 second - just for good UX

			document.getElementsByClassName('finger-print')[0].style.display = 'none'; // hide lock icon
			document.getElementsByClassName('success')[0].style.display = 'block'; // show double tick
			document.getElementsByClassName('success')[0].style.opacity = '1';

			document.getElementsByClassName('passBox')[0].style.display = 'none'; // hide input box

			errH.innerHTML = 'Bingo!'; // in first line

			err.innerHTML = 'The password was <br> Correct!'; // in 2nd line
			err.style.color = '#28a745';

			btn.innerHTML = 'Start Quiz &gt;'; // replace text of input box to this
			btn.removeAttribute('disabled'); // make it enable again

			btn.classList.add('btn-success'); // change color of btn
			btn.setAttribute('onclick', 'startQuiz();'); // set attribue onclick="startQuiz();"
		}, 2000);
	} else if (pass.value == '') {
		// if in case someone puts empty pass

		document.getElementsByClassName('finger-print')[0].style.display = 'none';
		document.getElementsByClassName('warning')[0].style.display = 'block';
		document.getElementsByClassName('warning')[0].style.opacity = '1';

		errH.innerHTML = 'Errrr!';

		document.getElementsByClassName('passBox')[0].style.display = 'none';

		err.style.color = '#dc3545';
		err.innerHTML = "Password Can't Be Empty!";

		btn.innerHTML = 'Reload';
		btn.removeAttribute('disabled');

		btn.classList.add('btn-danger');
		btn.setAttribute('onclick', 'window.location.reload()');
	} else {
		// if wrong password
		pass.setAttribute('disabled', 'disabled');
		btn.setAttribute('disabled', 'disabled');

		btn.innerHTML =
			'<i class="material-icons loading" style="font-size: 1.8em;">cached</i>';

		setTimeout(function() {
			document.getElementsByClassName('finger-print')[0].style.display = 'none';
			document.getElementsByClassName('warning')[0].style.display = 'block';
			document.getElementsByClassName('warning')[0].style.opacity = '1';

			document.getElementsByClassName('passBox')[0].style.display = 'none';

			errH.innerHTML = 'Errrr!';

			err.style.color = '#dc3545';
			err.innerHTML = 'The password was <br> NOT Correct!';

			btn.innerHTML = 'Dismiss';
			btn.removeAttribute('disabled');

			btn.classList.add('btn-danger');
			btn.setAttribute('onclick', 'window.location.reload();');

			pass.removeAttribute('disabled');
			btn.removeAttribute('disabled');

			errH.classList.add('shake');
			err.classList.add('shake');
		}, 2000);
	}
}

function resetErr() {
	// reset all error to default (This is triggered when user focus on pass input box)
	pass.style.borderColor = '#007bff';
	pass.value = '';
	err.innerHTML = '';

	err.classList.remove('shake');
	pass.classList.remove('shake');

	document.getElementsByClassName('warning')[0].style.display = 'none';
	document.getElementsByClassName('finger-print')[0].style.display = 'block';
	document.getElementsByClassName('finger-print')[0].style.opacity = '.6';

	submitBtn.innerHTML = 'Confirm Identity';
	submitBtn.classList.remove('btn-danger');
	submitBtn.classList.add('btn-primary');
}

function startQuiz() {
	theForm.style.display = 'none'; // hide the password form
	theQuiz.style.display = 'block'; // show the quiz page
	randomQ(); // trigger first question
}

/*-----------------------------------*\
$ The Quiz Begins...
\*-----------------------------------*/
var queDone = 0; // question asked...
var userAns = []; // user's answers
var queDoneArr = []; // storing which question is asked

// showing steps (dots)...
steps(totQ.length); // craetes " <span class="step"></span> ";
function steps(quizLength) {
	var mainStepDiv = document.getElementById('steps');
	for (var i = 0; i < quizLength; i++) {
		var span = document.createElement('span');
		span.className = 'step';
		mainStepDiv.appendChild(span);
	}
}

var p = document.getElementById('que'); // the question paragraph
var O1 = document.getElementById('opt1'); // option 01
var O2 = document.getElementById('opt2'); // option 02
var O3 = document.getElementById('opt3'); // option 03
var O4 = document.getElementById('opt4'); // option 04

// generates and places random questions...
function randomQ() {
	var thisAsked = false;
	var x = Math.floor(Math.random() * totQ.length); // get a random number b/w 0 to total questions
	while ((totQ[x].asked === 0) == true) {
		// if this question is not asked
		thisAsked = true; // this will be true
		totQ[x].asked = 1; // mark this as asked
		queDoneArr.unshift(x); // put in asked quesion array
		//console.log('QuesDone',queDoneArr);
		queDone = ++queDone; // increase the counter
		p.innerHTML = totQ[x].question; // write question
		O1.nextElementSibling.innerHTML = totQ[x].opt1; // write option 1
		O2.nextElementSibling.innerHTML = totQ[x].opt2; // write option 2
		O3.nextElementSibling.innerHTML = totQ[x].opt3; // write option 3
		O4.nextElementSibling.innerHTML = totQ[x].opt4; // write option 4
	}
	if (!thisAsked) {
		// if random number is already asked and this didn't become true go inside and fire random question again
		if (queDone != totQ.length)
			// if not reached total length
			randomQ(); // re-through random question
	}
}

function next() {
	// user clicks NEXT...
	if (!validateForm()) return false; // exit if no option in the current tab is selected
	topping(queDone); // setting up btn and steps counter...
	if (queDone == totQ.length) {
		// if reached the end of the questions
		theQuiz.style.display = 'none';
		document.getElementById('theResult').style.display = 'block';
		calcResult(); // calculates result
		// alert('Good Job! Calculating Result');
		return false;
	}
	randomQ(); // otherwise, fires next question...
}

var chkBox = document.getElementsByClassName('custom-control-input'); // targetting all checkboxes...

// deals with validation of radio options and adds to the user's answer Array...
function validateForm() {
	var valid = false;
	for (var i = 0; i < chkBox.length; i++) {
		// checks every radio btn
		if (chkBox[i].checked) {
			// if found checked
			valid = true;
			userAns.unshift(chkBox[i].value); // store user's answer
			// console.log('userAns:',userAns);
			chkBox[i].checked = false;
			nextBtn.setAttribute('disabled', 'disabled'); // disbale button for next question
			break;
		}
	}
	if (!valid) {
		// if no option selected
		alert('Please Select Any Option...');
		nextBtn.setAttribute('disabled', 'disabled');
	}
	if (valid)
		// if the valid status is true, mark the step as finished
		document.getElementsByClassName('step')[queDone - 1].className += ' finish';
	return valid; // return the valid status
}

// enable btn if radio btn is checked
var nextBtn = document.getElementById('next-button');
function enableBtn(i) {
	if (i.checked) nextBtn.removeAttribute('disabled');
	else nextBtn.setAttribute('disabled', 'disabled');
}

function topping(n) {
	// dynamic next button's text
	if (n == totQ.length - 1)
		document.getElementById('next-button').innerHTML = 'Submit';
	else if (n == totQ.length) {
		document.getElementById('next-button').innerHTML = 'No Questions';
		nextBtn.setAttribute('disabled', 'disabled');
	} else document.getElementById('next-button').innerHTML = 'Next';
	fixStepIndicator(n); // it will display the correct step indicator
}

function fixStepIndicator(n) {
	// removes the "active" class of all steps...
	var i,
		x = document.getElementsByClassName('step');
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(' active', '');
	}
	x[n - 1].className += ' active'; // and adds the "active" class on the current step
}

function calcResult() {
	// calculates result
	var ca = 0; // correct answer - currently ZerO..
	for (var i = 0; i < totQ.length; i++) {
		// loop till total num of questions
		var a = queDoneArr[i]; // getting done questions from array
		if (userAns[i] == totQ[a].answer) {
			// if user's answer matches with array's question's answer
			ca = ca + 1; // increase correct answers' counter
		}
	}
	var percentage = (ca / totQ.length) * 100; // calculates %
	// alert('Correct Answers: ' + ca + '\n' + 'Your Percentage is: ' + percentage);
	showResult(percentage, ca);
}

/*-----------------------------------*\
$ The Result Part...
\*-----------------------------------*/
var resultCircle = document.getElementById('resultCircle');
var resultFb = document.getElementById('resultFb');
var correctAns = document.getElementById('correctAns');
var quizCompleted = false;
var RColor;
function showResult(percentage, ca) {
	if (percentage == 100) {
		RColor = 'teal';
		resultFb.innerHTML = 'Wohoo.. Great, You are pass!';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 80) {
		RColor = 'green';
		resultFb.innerHTML = 'Congrats! You are pass.';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 65) {
		RColor = 'blue';
		resultFb.innerHTML = 'Good Effort, You are pass.';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else if (percentage >= 50) {
		RColor = 'orange';
		resultFb.innerHTML = 'You are passed!';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	} else {
		RColor = 'red';
		resultFb.innerHTML = 'Oh No! Your Are Failed... <br> Better Luck Next Time';
		correctAns.innerHTML = 'Correct Answers: ' + ca;
	}

	localStorage.setItem('percentage', percentage);
	localStorage.setItem('ca', ca);
	quizCompleted = true;

	var path =
		'<svg viewbox="0 0 36 36" class="circular-chart ' +
		RColor +
		'"> \
    <path class="circle-bg" \
    d="M18 2.0845 \
    a 15.9155 15.9155 0 0 1 0 31.831 \
    a 15.9155 15.9155 0 0 1 0 -31.831" \
    /> \
    <path class="circle" \
    stroke-dasharray="' +
		percentage +
		', 100" \
    d="M18 2.0845 \
    a 15.9155 15.9155 0 0 1 0 31.831 \
    a 15.9155 15.9155 0 0 1 0 -31.831" \
    /> \
    <text x="19" y="21" id="percentage">' +
		percentage +
		'%</text> \
    </svg>';
	resultCircle.innerHTML = path;
}

function logout() {
	// when logout button triggered
	localStorage.clear(); // clear all local storage
	location.reload(true); // hard reload the page
}

function retakeQuiz() {
	localStorage.removeItem('percentage');
	localStorage.removeItem('ca');
	location.reload(true); // hard reload the page
}
