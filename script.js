// function loadSupaBase() {
//     console.log("loadsupa function getting called");
//     console.log(supabase);
//     const SUPABASE_URL = "https://adkqpjypjztsfpgmiff.supabase.co";
//     const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFka3FwanlwenRmc3BvZ2ZtaWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDk2NzEsImV4cCI6MjA2MTMyNTY3MX0.ae6j0GEgTlQoQpV9_9Q-bi-Ww_w4nd6scsZjb2S47sU";
//     var sb= supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
//     console.log(sb);
//     return sb;
// }
//for doctors username and password

console.log(supabase);
const SUPABASE_URL = "https://adkqpjypjztsfpgmiff.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFka3FwanlwenRmc3BvZ2ZtaWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDk2NzEsImV4cCI6MjA2MTMyNTY3MX0.ae6j0GEgTlQoQpV9_9Q-bi-Ww_w4nd6scsZjb2S47sU";
var sb= supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
var doctorsDb={
}
var deptWiseDoctors={
    "Respiratory Medicine": {
        "RICU":[],
        "TB and Exam Ward":[],
        "OP":[],
        "Casualty":[],
    },
    "Pediatrics": {
        "Wards":[],
        "PICU":[],
        "OP":[]
    }
}; 


// Login Function
function login() {
    // const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    // var sb= loadSupaBase();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log("Username: " + username + ", Password: " + password);
    console.log(doctorsDb[username]); 

    async function getUsers() {
        const { data, error } = await sb
          .from("users")
          .select("*")
        .eq("username", username)
        .eq("password", password);
    
    if (error){
        console.error(error);
    }
    else if(data.length==0){
        console.log("No user found with the given credentials");
        document.getElementById('login-error').innerText = "Invalid credentials!";
    } 
    else {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('name', data[0].fullname);
        localStorage.setItem('batch', data[0].mobile);            
    }
}
}

// Submit Details Function
function submitDetails() {
    const college = document.getElementById('college').value;
    const batch = document.getElementById('batch').value;
    const name = document.getElementById('name').value.trim();
    if (college && batch && name) {
        localStorage.setItem('college', college);
        localStorage.setItem('batch', batch);
        localStorage.setItem('name', name);
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert("Please fill all fields!");
    }
}

// Load Home Page with Credentials
function loadHome() {
    const loggedIn = localStorage.getItem('loggedIn');
    const name = localStorage.getItem('name');
    const batch = localStorage.getItem('batch');
    if (!loggedIn || !name || !batch) {
        window.location.href = 'login2.html';
    } else {
        document.getElementById('doctor-credentials').innerText =
            `Logged in as: Dr. ${name} (Batch: ${batch})`;
    }
}

// Call loadHome() on index.html
if (document.getElementById('doctor-credentials')) {
    loadHome();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

function updateSubdepartments() {
    const deptSelect = document.getElementById("department");
    const subdeptSelect = document.getElementById("subdepartment");
    const selectedDept = deptSelect.value;

    // Clear current subdepartment options
    subdeptSelect.innerHTML = '<option value="">-- Select Subdepartment --</option>';

    if (selectedDept && deptWiseDoctors[selectedDept]) {
        var subdeptOptions = Object.keys(deptWiseDoctors[selectedDept]);
        subdeptOptions.forEach(subdept => {
        const option = document.createElement("option");
        // option.value = subdept.toLowerCase().replace(/\s+/g, "-");
        option.value=subdept;
        option.textContent = subdept;
        subdeptSelect.appendChild(option);
        });
    }
}



function fetchDoctorOnBoard() {
    var department = document.getElementById("department").value;
    var subDepartment = document.getElementById("subdepartment").value;
    console.log("Department: " + department);
    console.log("Sub-Department: " + subDepartment);

    var doctors=deptWiseDoctors?.department?.subDepartment??[];
    // doctors=["Praveen chandra Reddy","Lathieswar Reddy"];
    if(doctors.length>0){
        for(var i=0;i<doctors.length;i++){
            document.getElementById("doctorsOnDuty").innerHTML += `<p>${doctors[i]}</p><br>`;
        }
    }
    else{
        document.getElementById("doctorsOnDuty").innerHTML+="No Doctors on Duty";
    }
}

async function register() {
    console.log("Register function called");
    // const sb = loadSupaBase();
    const fullname = document.getElementById('reg-fullname').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const errorElem = document.getElementById('register-error');

    // if (!fullname || !phone || !username || !password) {
    //     errorElem.innerText = "Please fill in all fields.";
    //     return;
    // }

    // Optional: Validate phone number format (10 digits)
    if (!(/^\d{10}$/.test(phone))) {
        errorElem.innerText = "Please enter a valid 10-digit phone number.";
        return;
    }

    // let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (await isValueTaken("username",username)) {
        errorElem.innerText = "Username already exists. Please choose another";
        return;
    }
    else{
        console.log("username do not exist");
    }

    if (await isValueTaken("mobile",phone)) {
        errorElem.innerText = "Mobile already exists. Please choose another";
        return;
    }
    else{
        console.log("mobile do not exist");
    }

    async function insertUser() {
        // var sb= loadSupaBase();
        const { data, error } = await sb
          .from("users")
          .insert([{ username: username, fullname: fullname, phone: phone, password: password }]);
    
        if (error){
            errorElem.style.color = "red";
            errorElem.innerText = "Registration Unsuccessful!" ;
            console.error(error);
        }
        else{
            errorElem.style.color = "green";
            errorElem.innerText = "Registration Successful!" ;
            // Redirect to login page after successful registration
            setTimeout(() => {
                window.location.href = 'login2.html';
            }, 1200);
        } 
    }

    insertUser();
    console.log("Done with register");
}

async function isValueTaken(field,value) {
    const { data, error } = await sb
      .from('users')         // your table name
      .select('username')             // you can select anything, even just 'id' for performance
      .eq(field, value);
  
    if (error) {
      console.error("Error checking username:", error);
      return false;
    }
    console.log("checked whether value is taken or not");
    return data.length > 0;     // true if username exists
  }