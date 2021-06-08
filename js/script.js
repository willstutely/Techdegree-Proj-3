
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


// "T-Shirt Info"
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;
const label = document.getElementById('color').previousElementSibling;

// Disable the Color options until user selects a design preference
color.disabled = true;
if (color.disabled === true) {
    label.textContent = "Color: Select a design to view color options"
}

// Event Listener on the "Design" menu.  Enable Color options when a change is detected
// then loop over the color options and compare the 'data-theme' attribute to the value of the
// selected Design option.  If the two values match then hide the options that do not match
design.addEventListener('change', e => {
    color.disabled = false;
    label.textContent = "Color:"
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

// Register for Activities
// Select the <fieldset> for the registration of activities, and the elements with the 
// ID "activities-cost", and create a variable to store the cumulative monetary value
// of each activity
const register = document.getElementById('activities');
const costTotal = document.getElementById('activities-cost');
let totalCost = 0;

// Event Listener on the registration fieldset.  Upon detecting 'change' to a checkbox
// collect the 'data-cost' attribute, convert that value to a number (using parseInt), 
// and then verify 'checked' status of that item in order to add/subtract the parsed value 
// to the variable "totalCost".  Update the innerHTML of 'costTotal' to reflect the total value
// of selected activities
register.addEventListener('change', e => {
    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked === true) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    costTotal.innerHTML = `Total: $${totalCost}`
});

