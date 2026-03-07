const courses = [

{
subject: "CSE",
number: 110,
credits: 2,
completed: true
},

{
subject: "CSE",
number: 111,
credits: 2,
completed: true
},

{
subject: "CSE",
number: 210,
credits: 2,
completed: false
},

{
subject: "WDD",
number: 130,
credits: 2,
completed: true
},

{
subject: "WDD",
number: 131,
credits: 2,
completed: true
},

{
subject: "WDD",
number: 231,
credits: 2,
completed: false
}

];

const coursesContainer = document.querySelector("#courses-container");

const courseCount = document.querySelector("#course-count");

const creditCount = document.querySelector("#credit-count");

const allButton = document.querySelector("#all-btn");

const cseButton = document.querySelector("#cse-btn");

const wddButton = document.querySelector("#wdd-btn");


function displayCourses(courseList) {

coursesContainer.innerHTML = "";

courseList.forEach(course => {

const courseCard = document.createElement("div");

courseCard.classList.add("course-card");

if(course.completed){

courseCard.classList.add("completed");

courseCard.innerHTML = `✓ ${course.subject} ${course.number}`;

}

else{

courseCard.textContent = `${course.subject} ${course.number}`;

}

coursesContainer.appendChild(courseCard);

});

courseCount.textContent =
`The total number of courses listed below is ${courseList.length}`;

const totalCredits =
courseList.reduce((sum, course) => sum + course.credits, 0);

creditCount.textContent =
`The total credits for courses listed below is ${totalCredits}`;

}


allButton.addEventListener("click", () => {

displayCourses(courses);

});

cseButton.addEventListener("click", () => {

const filtered = courses.filter(course => course.subject === "CSE");

displayCourses(filtered);

});

wddButton.addEventListener("click", () => {

const filtered = courses.filter(course => course.subject === "WDD");

displayCourses(filtered);

});


displayCourses(courses);