# QuizApp
A Full Stack Quiz app made using Spring Boot, React and MySQL.

Project Introduction
This project is aimed at creating a quiz system with two distinct roles: Admin and User. The admin will have control over the test creation, question management, and test results tracking, while users will be able to sign up, log in, take tests, and receive their results. We’ll ensure that the application is secure and scalable, and we’ll implement features like real-time test monitoring and automatic submission when the time runs out during a test.

Features of the Quiz Application

Admin Features

Automatic Admin Account Creation:
As soon as the application starts, an admin account is automatically created in the backend. This admin will have the default credentials (email: admin@gmail.com, password: admin), which can be used to log in through the admin login page.

Test and Question Management:
The admin can create multiple tests. For each test, the admin can add questions with four possible options and one correct answer. Questions can cover various topics.

View Test Results:
Admins can access and review the test results of all users. They can see how many questions were answered correctly and the overall score percentage for each user.

User Features

User Signup and Login:
Users can create an account using the signup page, providing their email, name, and password. Once registered, they can use the same login page to access the application and participate in available tests.

Taking Tests:
Users will have access to a list of available tests on dashboard. They can select any test, answer the questions, and submit their answers.

Real-Time Test Monitoring and Automatic Submission:
While taking a test, the remaining time will be displayed, ensuring users are aware of how much time they have left. If the user runs out of time, their answers will automatically be submitted, ensuring they don’t lose the progress they’ve made during the test.

View Test Results:
After completing a test, users can view their results, including the number of correct answers, total questions, and their overall score percentage.

