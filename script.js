const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message; 
}

// show success  outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//email validation
function checkEmailValidate(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }else {
        showError(input, "Enter a valid email");
    }
}

//required fields
function requiredFields(inputArr) {
    let isRequired = false;
    inputArr.forEach( input => {
        if (input.value.trim() === '') {
            showError(input, `${getfieldName(input)}  is required`);
            isRequired = true;
        }else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// getting Field name
function getfieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getfieldName(input)} is must be greater than ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getfieldName(input)} is must be less than ${max} characters`);        
    }else {
        showSuccess(input);
    }
}

// chech password match
function passswordMatch(input1,input2) {
    if(input1.value !== input2.value) {
        showError(input2, "Password doesn't match");
    }
}

// event listener
form.addEventListener("submit", e => {
    e.preventDefault();

    if(!requiredFields([username,email,password,password2])) {
        checkLength(username,3,15);
        checkLength(password,6,20);
        checkEmailValidate(email);
        passswordMatch(password,password2);
    }

});


