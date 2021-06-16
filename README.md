This is the Team Treehouse Project 3: Interactive Registration Form

Basic Info Section:
Upon page loading the "name" input field is focused so the user can begin entering their name.  A "keyup" event listener is added to the "email" input field to alert the user when they enter a properly formatted email address.  This is the only field with the "keyup" event listener.  

T Shirt Section:
Users are prevented from selecting a T shirt color until a design theme is selected.  When a design theme is selected only those colors associated with that particular design appear in the drop down menu.

Register for Activities Section:
When any activity is chosen the dollar amount is accumulated and the total shown at the bottom of the section.  If an activity is unchecked that amount is subtracted from the total.  Once an activity is selected any activity with a conflicting day and time is automatically disabled to prevent registering for two activities at the same time.  If that activity is deselected then the disabled activities are enabled.

Payment Section:
Payment by credit card is shown as the default option until the user selects one of the two remaining options.  In that event the relevant payment info is shown, and all other options are hidden.  

Validation:
Users will not be able to submit the form if the required areas aren't filled in properly.  Helpful hints appear on the relevent areas that need attention.  Comments in the JavaScript file detail how validation is accomplished