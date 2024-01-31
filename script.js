const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#password-check");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkInputs();
});

// email validation function

const isEmail = (emailVal) => {
  var atSymbol = emailVal.indexOf("@");
  if (atSymbol < 1) {
    return false;
  }

  var dot = emailVal.lastIndexOf(".");
  if (dot <= atSymbol + 2 || dot === emailVal.length - 1) {
    // Dot is too close to '@' or at the end
    return false;
  }

  return true;
};

const isPhoneNumber = (phoneVal) => {
  const phoneString = phoneVal.toString();

  // Check for length not more than 10
  let hasValidLength = phoneString.length === 10;

  return hasValidLength;
};

const isStrongPassword = (password) => {
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']', ':', ';', '<', '>', ',', '.', '?', '~', '\\', '/'];
    var specialCharactersCheck = false;

    for (let i = 0; i < password.length; i++) {
        if (specialCharacters.includes(password[i])) {
            specialCharactersCheck = true;
            break;
        }
    }

    var numericCheck = false;
    var lowerCaseCheck = false;
    var upperCaseCheck = false;
    for (let i = 0; i < password.length; i++) {
        const charCode = password.charCodeAt(i);

        if (charCode >= 48 && charCode <= 57) {
            numericCheck = true;
        }

        if (charCode >= 97 && charCode <= 122) {
            lowerCaseCheck = true;
        }

        if (charCode >= 65 && charCode <= 90) {
            upperCaseCheck = true;
        }
    }
    return numericCheck && specialCharactersCheck && lowerCaseCheck && upperCaseCheck && lengthCheck;
};


const doesPasswordMatch = (password, repeatPassword) => {
  return password === repeatPassword;
};

//defining the checkInputs function
const checkInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value;
  const passwordValue = password.value.trim();
  const repeatPasswordValue = passwordCheck.value.trim();

  // Validate your username
  if (usernameValue === "") {
    setErrormsg(username, "Username cannot be blank");
  } else if (usernameValue.length <= 2) {
    setErrormsg(username, "Username must be more than 2 characters");
  } else {
    setSuccessmsg(username);
  }

  //validate your email

  if (emailValue === "") {
    setErrormsg(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrormsg(email, "Not a valid email");
  } else {
    setSuccessmsg(email);
  }

  // Check the phone number entered by the user
  // Check the phone number entered by the user
  if (phoneValue === "") {
    setErrormsg(phone, "Phone number cannot be blank");
  } else if (!isPhoneNumber(phoneValue)) {
    setErrormsg(phone, "Not a valid phone number");
  } else {
    setSuccessmsg(phone);
  }

  // Check if the password is not blank
  if (passwordValue === "") {
    setErrormsg(password, "Password cannot be blank");
  }else if(passwordValue.length <=6){
    setErrormsg(password,"Password is too short , should contain at least 8 characters")
  } 
  else {
    if (isStrongPassword(passwordValue)) {
      setSuccessmsg(password);
    } else {
      setErrormsg(password, "Weak password. Please use a stronger password.");
    }
  }

  // check the repeat password value  against the original password value
  if (repeatPasswordValue === "") {
    setErrormsg(passwordCheck, "Repeat Password field can't be blank.");
  } else if (repeatPasswordValue === passwordValue) {
    setSuccessmsg(passwordCheck);
  } else {
    setErrormsg(passwordCheck, "Passwords do not match");
  }

  
};






function setErrormsg(input, errorMsg) {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  small.style.visibility = "visible";
  small.innerHTML = `${errorMsg}`;
  const errorIcon = parent.querySelector(".fa-exclamation");
  errorIcon.style.visibility = "visible";
  const correctIcon = parent.querySelector(".fa-circle-check");
  correctIcon.style.visibility = "hidden";
}

function setSuccessmsg(input) {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  small.style.visibility = "hidden";
  //   small.innerHTML = `${errorMsg}`;
  const errorIcon = parent.querySelector(".fa-exclamation");
  errorIcon.style.visibility = "hidden";
  const correctIcon = parent.querySelector(".fa-circle-check");
  correctIcon.style.visibility = "visible";
}
