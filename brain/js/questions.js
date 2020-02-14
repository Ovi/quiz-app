// Quiz Creator;
function CQuiz(que, o1, o2, o3, o4, ans, d) {
	this.question = que;
	this.opt1 = o1;
	this.opt2 = o2;
	this.opt3 = o3;
	this.opt4 = o4;
	this.answer = ans;
	this.asked = d;
}

// Question 1
var q1 = new CQuiz(
	'Which function among the following lets to register a function to be invoked repeatedly after a certain time?',
	'setTimeout()',
	'setTotaltime()',
	'setInterval()',
	'none of the mentioned',
	3,
	0
);

// Question 2
var q2 = new CQuiz(
	'To which object does the location property belong?',
	'Window',
	'Position',
	'Element',
	'Location',
	1,
	0
);

// Question 3
var q3 = new CQuiz(
	'What is the result of the following code snippet? <br> <pre> window.location === document.location </pre>',
	'False',
	'True',
	'1',
	'0',
	2,
	0
);

// Question 4
var q4 = new CQuiz(
	'Which of the following is not a framework?',
	'jQuery',
	'.NET',
	'JavaScript',
	'None of the mentioned',
	3,
	0
);

// Question 5
var q5 = new CQuiz(
	'Inside which HTML element do we put the JavaScript?',
	'&lt;javascript&gt;',
	'&lt;script&gt;',
	'&lt;scripting&gt;',
	'&lt;js&gt;',
	2,
	0
);

// Question 6
var q6 = new CQuiz(
	'What is the correct JavaScript syntax to change the content of the HTML element below? <br> <pre>&lt;p id="demo"&gtThis is made by Owais.&lt;/p&gt</pre>',
	'document.getElementByName("p").innerHTML = "Hello World!";',
	'#demo.innerHTML = "Hello World!";',
	'document.getElementById("demo").innerHTML = "Hello World!";',
	'document.getElement("p").innerHTML = "Hello World!";',
	3,
	0
);

// Question 7
var q7 = new CQuiz(
	'What is the correct syntax for referring to an external script called "script.js"?',
	'&lt;script src="script.js"&gt;',
	'&lt;script href="script.js"&gt;',
	'&lt;script name="script.js"&gt;',
	'&lt;script link="script.js"&gt;',
	1,
	0
);

// Question 8
var q8 = new CQuiz(
	'How do you write "Hello World" in an alert box?',
	'alert("Hello World");',
	'msgBox("Hello World");',
	'prompt("Hello World");',
	'alertBox("Hello World");',
	1,
	0
);

// Question 9
var q9 = new CQuiz(
	'How do you create a function in JavaScript?',
	'function = myFunction()',
	'function:myFunction()',
	'function myFunction()',
	'None of the mentioned',
	3,
	0
);

// Question 10
var q10 = new CQuiz(
	'How do you call a function named "myFunction"?',
	'myFunction()',
	'call function myFunction()',
	'call myFunction()',
	'None of the mentioned',
	1,
	0
);

// total question...
var totQ = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
