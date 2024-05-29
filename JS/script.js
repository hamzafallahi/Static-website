// Get form and input elements

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Listen for form submission

form.addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Validate form inputs
    validateInputs();
    if(isFormValid()){
        // Save the username to localStorage
        localStorage.setItem('savedUsername', username.value);
        localStorage.setItem('savedUseremail', email.value);
        localStorage.setItem('savedUserpass', password.value);
        
        // Redirect to the user.html page window.location.href = 'user.html';
        window.open("login.html", "_self");
    }

});

// Function to display error for an input element
function displayError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    // Show the error message
    errorDisplay.innerText = message;
    // Add the 'error' class to highlight the input
    inputControl.classList.add('error');
    // Remove the 'success' class
    inputControl.classList.remove('success');
}

// Function to display success for an input element
function displaySuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    // Clear the error message
    errorDisplay.innerText = '';
    // Add the 'success' class to highlight the input
    inputControl.classList.add('success');
    // Remove the 'error' class
    inputControl.classList.remove('error');
}

// Function to check if the email is valid
function isValidEmail(email) {

    email = email.toLowerCase();
    if (email.indexOf('@') === -1) {
        return false;
    }
    let ch1=email.substr(0,email.indexOf('@'));
    let ch2=email.substr(email.indexOf('@')+1);
    if (ch1 === '' ) {
        return false;
    }
    if (ch2.indexOf('.') === -1 || ch2 ==='') {
        return false;
    }
    for (let i = 0; i < ch2.length; i++) {
        if (!(ch2.charAt(i) >= 'a' && ch2.charAt(i) <= 'z' || ch2.charAt(i) === '.')) {
            return false;
        }
    }

    return true;
    
}

// Function to validate all form inputs
function validateInputs() {
    // Get input values
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // Validate username
    if (usernameValue === '') {
        displayError(username, 'Username is required');
    } else {
        displaySuccess(username);
    }

    // Validate email
    if (emailValue === '') {
        displayError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        displayError(email, 'Provide a valid email address');
    } else {
        displaySuccess(email);
    }

    // Validate password
    if (passwordValue === '') {
        displayError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        displayError(password, 'Password must be at least 8 characters');
    } else {
        displaySuccess(password);
    }

    // Validate password confirmation
    if (password2Value === '') {
        displayError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        displayError(password2, "Passwords don't match");
    } else {
        displaySuccess(password2);
    }
}


// Function to check if all form inputs are valid
function isFormValid() {
    // Check if all input elements have the 'success' class
    return (
        username.parentElement.classList.contains('success') &&
        email.parentElement.classList.contains('success') &&
        password.parentElement.classList.contains('success') &&
        password2.parentElement.classList.contains('success')
    );
}

