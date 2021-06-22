
/* ======================
   Basic Info Section
========================= */

// Select the Name Input and call the '.focus()' method so it will be highlighted on page load or refresh
const nameInput = document.getElementById('name');
nameInput.focus();

// Select the Job Role and "Other Job Role" elements
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

// Hide "other job" input until the "other" option is selected from the drop down menu
otherJobRole.style.display = 'none';

// "Change" event listener to detect selection from drop down menu. Conditional to test 
// if the e.target.value is strictly equal to 'other' in which case the "other job" input is made visible
// else keep it 'none'
jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

/* ===================
    "T-Shirt Info"
====================== */
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;
const label = document.getElementById('color').previousElementSibling;

// Disable the Color options until user selects a design preference
color.disabled = true;

// Event Listener on the "Design" menu.  Enable Color options when a change is detected
// then loop over the color options and compare the 'data-theme' attribute to the value of the
// selected Design option.  If the two values match then hide the options that do not match
design.addEventListener('change', e => {
    color.disabled = false;
    label.textContent = "Color:";
    for (let i=0; i<colorOption.length; i+=1) {
        const designChoice = e.target.value;
        const designAttribute = colorOption[i].getAttribute('data-theme');
        if (designChoice === designAttribute) {
            colorOption[i].hidden = false;
            colorOption[i].selected = true;
        } else {
            colorOption[i].hidden = true;
            colorOption[i].selected = false;
        }
    }
});

/* =========================
   Register for Activities
============================ */
// Select the <fieldset> for the registration of activities, and the elements with the 
// ID "activities-cost", and create a variable to store the cumulative monetary value
// of each activity
const register = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const activities = activitiesBox.children;
const costTotal = document.getElementById('activities-cost');
let totalCost = 0;

// Event Listener on the registration fieldset.  Upon detecting 'change' to a checkbox
// collect the 'data-cost' attribute, convert that value to a number (using parseInt), 
// and then verify 'checked' status of that item in order to add/subtract the parsed value 
// to the variable "totalCost".  Update the innerHTML of 'costTotal' to reflect the total value
// of selected activities

register.addEventListener('change', e => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    let schedule = e.target.getAttribute('data-day-and-time');
// When an activity is chosen iterate through the rest of the activities and disable
// the activities with the same day and time.  Enable those activities if the user
// unchecks the box.
    if (e.target.checked) {
        for (let i=0; i<activities.length; i++) {
            let others = activities[i].firstElementChild;
            let othersTime = others.getAttribute('data-day-and-time');
            if (schedule === othersTime) {
              others.disabled = true;
              e.target.disabled = false;
            }
        }
        totalCost += dataCost;
        // call validateActivity function to clear Activity Hint when an activity is checked
        validateActivity(e.target);
    } else {
        for (let i=0; i<activities.length; i++) {
            let others = activities[i].firstElementChild;
            let othersTime = others.getAttribute('data-day-and-time');
            if (schedule === othersTime) {
              others.disabled = false;
            }
        }
        totalCost -= dataCost;
    }
    costTotal.innerHTML = `Total: $${totalCost}`
});

/* ===================
    Payment Info
====================== */

// Select the <select> element with the #payment ID and store it in a variable, along with
// the <div> elements for the various methods of payment
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

// Set the initial display of Paypal and Bitcoin to "none" so that the Credit Card acts as default
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Set the attribute of the Credit Card Option as "selected" by default
payment.children[1].setAttribute('selected', "");

// Function for deselecting a payment option. Purpose: keep event listener clean
function deselectOption(arr) {
    for (let i=0; i<arr.children.length; i++){
        arr.children[i].removeAttribute('selected', '');
    }
    return;
}

// Function first calls the deslectOption function to clear the slate, and then loops
// through the payment options to check which one has been selected.  Depending on which one
// the other payment options are appropriately hidden.
function updatePayment(arr) {
    deselectOption(payment);
    for (let i=0; i<arr.children.length; i++) {
        if (arr.children[i].selected) {
            if (arr.children[i].value === 'credit-card') {
                arr.children[i].setAttribute('selected', "");
                creditCard.style.display = '';
                paypal.style.display = 'none';
                bitcoin.style.display = 'none';
            } else if (arr.children[i].value === 'paypal') {
                arr.children[i].setAttribute('selected', "");
                paypal.style.display = ''
                creditCard.style.display = 'none';
                bitcoin.style.display = 'none';
            } else if (arr.children[i].value === 'bitcoin') {
                arr.children[i].setAttribute('selected', "");
                bitcoin.style.display = ''
                creditCard.style.display = 'none';
                paypal.style.display = 'none';
            }
        }
    }
}

// Event Listener on "payment" that checks the 'selected' status of each option and
// calls the updatePayment function on the 'payment' array 
payment.addEventListener('change', e => {
    if (payment.children[3].selected) {
        updatePayment(payment);
    } else if (payment.children[2].selected) {
        updatePayment(payment);
    } else if (payment.children[1].selected) {
        updatePayment(payment);
    }
})

/* ===================
    Form Validation
====================== */

// Form input elements selected and stored in relevant variables
const emailInput = document.getElementById('email');
const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

// Hint Elements selected and stored in relevant variables
const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const cardHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const cvvHint = document.getElementById('cvv-hint');
const activityHint = document.getElementById('activities-hint');

/* =========================
Validation Function Section.
============================ */

// Each function (with the exception of the Activity Validator collects the value 
// of the relevant input; stores the results of a regex test in another variable 
// that is then used in a conditional which displays or hides the relevant 
// hint/error message for that input

// Name validation function. nameHint variable stored near beginning of section
function validateName(input) {
    const nameTitle = nameInput.parentNode;
    let name = input.value;
    let nameTest = /^[a-z ,'-]+$/i.test(name);
    if (nameTest) {
        nameHint.style.display = 'none';
        nameTitle.className = '';
    } else {
        nameHint.style.display = 'block';
        nameTitle.className = "not-valid";
        event.preventDefault();
    }
    return;
};

// Email validation function. emailHint variable stored near beginning of section
// If the email input field is left blank the hint textContent changes to remind
// the user to enter their email
const emailTitle = emailInput.parentNode; 

function validateEmail(input) {
    let address;
    if (input.value.length >= 1) {
        address = input.value;
        let emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i.test(address);
        if (emailTest) {
            emailHint.style.display = 'none';
            emailTitle.className = '';
        } else {
            emailHint.style.display = 'block';
            emailTitle.className = "not-valid";
            event.preventDefault();
        } 
    }
    return;
}

// Credit Card validation function. cardHint variable stored near beginning of section
function validateCreditCard(input) {
    const creditTitle = creditCardNumber.parentNode;
    if (payment.children[1].selected) {
        let card = input.value
        let cardTest = /^[\d]{13,16}$/.test(card);
        if (cardTest) {
            cardHint.style.display = 'none';
            creditTitle.className = "";
        } else {
            cardHint.style.display = 'block';
            creditTitle.className = "not-valid";
            event.preventDefault();
        }
        return;
    }
}
// Zip Code validation function. zipHint variable stored near beginning of section
function validateZipCode(input) {
    const zipTitle = zipCode.parentNode;
    if (payment.children[1].selected) {
        let zip = input.value;
        let zipTest = /^[\d]{5}$/.test(zip);
        if (zipTest) {
            zipHint.style.display = 'none';
            zipTitle.className = "";
        } else {
            zipHint.style.display = 'block';
            zipTitle.className = "not-valid";
            event.preventDefault();
        }
        return;
    }
}

// CVV validation function. cvvHint variable stored near beginning of section
function validateCVV(input) {
    const cvvTitle = cvv.parentNode;
    if (payment.children[1].selected) {
        let cvvCode = input.value;
        let cvvTest = /^[\d]{3}$/.test(cvvCode);
        if (cvvTest) {
            cvvHint.style.display = 'none';
            cvvTitle.className = "";
        } else {
            cvvHint.style.display = 'block';
            cvvTitle.className = "not-valid";
            event.preventDefault();
        }
        return;
    }
}

// Activity validation function. activityHint variable stored near beginning of section
// This function operates by checking if the value of the totalCost variable
// is greater than zero which would indicate whether or not a user selected 
// an activity.  Based on the boolean value the hint/error message is displayed
// or hidden.
function validateActivity(input) {
    const legend = register.firstElementChild;
    if (totalCost>0) {
        activityHint.style.display = 'none';
        legend.className = "";
    } else {
        
        activityHint.style.display = 'block';
        legend.className = "not-valid";
        event.preventDefault();
    }
    return;
}

// Event Listener on the <form> element that calls the corresponding input validators
// Conditional added for email verification to check if field was left blank in which case
// the hint is changed to 
form.addEventListener('submit', e => {
    validateName(nameInput);
    if (emailInput.value.length === 0) {
        emailHint.style.display = 'block'
        emailTitle.className = 'not-valid';
        emailHint.textContent = 'Whoops, you forgot your email!'
    } else {
        validateEmail(emailInput);
    }
    validateActivity(register);
    validateCreditCard(creditCardNumber);
    validateZipCode(zipCode);
    validateCVV(cvv);
});

// Keyup listeners on all required inputs that calls the relevant functions
// thereby resolving the error message as the user correctly enters the necessary info
nameInput.addEventListener('blur', e => {
    validateName(e.target);
})

nameInput.addEventListener('keyup', e => {
    if (e.target.value.length >= 1) {
        validateName(e.target);
    }
});

emailInput.addEventListener('blur', e => {
    if (emailInput.value.length < 1) {
        emailHint.style.display = 'block'
        emailTitle.className = 'not-valid';
        emailHint.textContent = 'Whoops, you forgot your email!'  
    }      
});

emailInput.addEventListener('keyup', e => {
    validateEmail(e.target);
})

creditCardNumber.addEventListener('keyup', e => {
    if (cardHint.style.display === 'block') {
        validateCreditCard(e.target);
    }
})

zipCode.addEventListener('keyup', e => {
    if (zipHint.style.display === 'block') {
        validateZipCode(e.target);
    }
})

cvv.addEventListener('keyup', e => {
    if (cvvHint.style.display === 'block') {
        validateCVV(e.target);
    }
})

// Activities Focus/Blur events
const activityDiv = document.getElementById('activities-box');
const activityDivChildren = activityDiv.children;

activityDivChildren[0].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[0].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[1].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[1].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[2].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[2].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[3].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[3].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[4].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[4].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[5].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[5].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})

activityDivChildren[6].firstElementChild.addEventListener('focus', e => {
    e.target.parentNode.className = 'focus';
})

activityDivChildren[6].firstElementChild.addEventListener('blur', e => {
    e.target.parentNode.className = '';
})