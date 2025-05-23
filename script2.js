// // Register Function
// function register() {
//     const fullname = document.getElementById('reg-fullname').value.trim();
//     const phone = document.getElementById('reg-phone').value.trim();
//     const username = document.getElementById('reg-username').value.trim();
//     const password = document.getElementById('reg-password').value.trim();
//     const errorElem = document.getElementById('register-error');

//     if (!fullname || !phone || !username || !password) {
//         errorElem.innerText = "Please fill in all fields.";
//         return;
//     }

//     // Optional: Validate phone number format (10 digits)
//     if (!/^\d{10}$/.test(phone)) {
//         errorElem.innerText = "Please enter a valid 10-digit phone number.";
//         return;
//     }

//     let users = JSON.parse(localStorage.getItem('users') || '{}');
//     if (users[username]) {
//         errorElem.innerText = "Username already exists. Please choose another.";
//         return;
//     }

//     users[username] = {
//         password: password,
//         fullname: fullname,
//         phone: phone
//     };
//     localStorage.setItem('users', JSON.stringify(users));
//     errorElem.style.color = "green";
//     errorElem.innerText = "Registration successful! Redirecting to login...";
//     setTimeout(() => {
//         window.location.href = 'login.html';
//     }, 1200);
// }

// // Login Function
// function login() {
//     const username = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const errorElem = document.getElementById('login-error');

//     let users = JSON.parse(localStorage.getItem('users') || '{}');
//     if (users[username] && users[username].password === password) {
//         localStorage.setItem('loggedIn', 'true');
//         localStorage.setItem('username', username);
//         window.location.href = 'form.html'; // Go to details form after login
//     } else {
//         errorElem.innerText = "Invalid credentials!";
//     }
// }

// // Submit Details Function (unchanged, but you can add fullname/phone if needed)
// function submitDetails() {
//     // You may want to update this to reflect your new flow
//     const system = document.getElementById('system-select') ? document.getElementById('system-select').value : '';
//     const subsystem = document.getElementById('subsystem-select') ? document.getElementById('subsystem-select').value : '';
//     if (system && subsystem) {
//         // Save assignment to localStorage
//         const username = localStorage.getItem('username');
//         const users = JSON.parse(localStorage.getItem('users') || '{}');
//         const user = users[username];
//         let assignments = JSON.parse(localStorage.getItem('assignments') || '{}');
//         if (!assignments[system]) assignments[system] = {};
//         if (!assignments[system][subsystem]) assignments[system][subsystem] = [];
//         // Prevent duplicate assignment
//         if (!assignments[system][subsystem].some(u => u.username === username)) {
//             assignments[system][subsystem].push({
//                 fullname: user.fullname,
//                 phone: user.phone,
//                 username: username
//             });
//             localStorage.setItem('assignments', JSON.stringify(assignments));
//         }
//         window.location.href = 'index.html'; // Redirect to home page
//     } else {
//         alert("Please select both system and subsystem!");
//     }
// }

// // Load Home Page with Credentials (shows full name and phone if available)
// function loadHome() {
//     const loggedIn = localStorage.getItem('loggedIn');
//     const username = localStorage.getItem('username');
//     const users = JSON.parse(localStorage.getItem('users') || '{}');
//     const user = users[username];
//     if (!loggedIn || !user) {
//         window.location.href = 'login.html';
//     } else {
//         const fullname = user.fullname || username;
//         const phone = user.phone || 'N/A';
//         if (document.getElementById('doctor-credentials')) {
//             document.getElementById('doctor-credentials').innerText =
//                 `Logged in as: Dr. ${fullname} | Phone: ${phone}`;
//         }
//     }
// }

// // Call loadHome() on index.html
// if (document.getElementById('doctor-credentials')) {
//     loadHome();
// }

