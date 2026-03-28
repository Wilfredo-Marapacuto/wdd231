const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Computer Programming",
    description: "This course introduces basic programming concepts, problem solving, and logical thinking using beginner-friendly programming techniques.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Computer Programming",
    description: "This course focuses on writing reusable code with functions, improving program structure, and solving more advanced programming problems.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Software Development",
    description: "This course teaches object-oriented programming concepts such as classes, objects, encapsulation, and abstraction.",
    technology: ["C#"],
    completed: false
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course covers the fundamentals of HTML, CSS, and basic web page structure.",
    technology: ["HTML", "CSS"],
    completed: true
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces JavaScript fundamentals and how to add dynamic behavior to websites.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    certificate: "Web Development",
    description: "This course focuses on responsive design, accessibility, asynchronous JavaScript, JSON, APIs, and modern frontend development practices.",
    technology: ["HTML", "CSS", "JavaScript", "JSON", "APIs"],
    completed: false
  }
];

const coursesContainer = document.querySelector("#courses-container");
const courseCount = document.querySelector("#course-count");
const creditCount = document.querySelector("#credit-count");
const allButton = document.querySelector("#all-btn");
const cseButton = document.querySelector("#cse-btn");
const wddButton = document.querySelector("#wdd-btn");
const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
  `;

  courseDetails.showModal();

  const closeModal = document.querySelector("#closeModal");

  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });

  courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
      courseDetails.close();
    }
  });
}

function displayCourses(courseList) {
  coursesContainer.innerHTML = "";

  courseList.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
      courseCard.textContent = `✓ ${course.subject} ${course.number}`;
    } else {
      courseCard.textContent = `${course.subject} ${course.number}`;
    }

    courseCard.addEventListener("click", () => {
      displayCourseDetails(course);
    });

    coursesContainer.appendChild(courseCard);
  });

  courseCount.textContent =
    `The total number of courses listed below is ${courseList.length}`;

  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

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