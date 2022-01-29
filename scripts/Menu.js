/* A simple menu that will prompt the user from
 * four options. If option is invalid it will 
 * prompt again. Function has been tested and
 * is working as intended.
 */
do {
    var flag = true;
    var option = prompt("Calendar MeetSync\n\n\n" +
                "1) Add a meeting\n" +
                "2) Search for a meeting\n" +
                "3) Delete a meeting\n" +
                "4) Display all meetings\n\n" +
                "Please select an option: ");

    // Maybe not needed but covering border cases	
    parseInt(option);
    if(option > 0 && option < 5) {
        flag = false;
    }

    switch(option) {
       case '1':
            window.alert("Adding a meeting...");
            break;
    
        case '2':
            window.alert("Searching for a meeting...");
            break;

        case '3':
            window.alert("Deleting a meeting...");
            break;

        case '4':
            window.alert("Displaying all meetings...");
            break;

        default:
            window.alert("Wrong option! Please try again!");
    }

} while(flag);


/**
 * addEvent()
 * 
 * @param {string} name: name of the new event
 * @param {date} time: the time of the new event
 * @param {boolean} repeat: true if need to repeat, false otherwise
 * @param {string} frequency: how often the repeat
 * @param {number} priority: set a priority level
 * 
 * Notes:
 *      Function will be called if user decides to enter a new event
 *      on the calendar.
 */
function addEvent() {

    console.log("test event");
    var name = prompt("Please add the following separated by a space\n" +
                        "- Name for the event\n"); 

    var time = prompt("- Enter time of the event\n");

    var repeat = prompt("- Would you like to repeat event? (yes or no)\n");
    if(repeat == 'yes') {
        var frequency = prompt("- How often?\n");
    }
    
    var priority = prompt("- Set a priority (1 -> low   ||   2 -> medium   ||   3 -> high\n");

    // Create new event
    newEvent = new Event(name, time, repeat, frequency, priority);
}


/*
 * findEvent()
 *
 * @param {}
 *
 * Notes:
 * 	The function will search for an event in the calendar
 * 	and will display a message to the user if it was found.
 */
function findEvent() {


}


/*
 * deleteEvent()
 *
 * @param {}
 *
 * Notes:
 * 	The function will delete a requested event from the
 *	calendar. If the event is not found, a message will 
 *	be displayed notifying the user.
 */
function deleteEvent() {


}


/*
 * displayAll()
 *
 * @param {}
 *
 * Notes:
 * 	The function will display all the event that are
 * 	currently stored in the calendar. If no events are 
 * 	found, it will simply show that none were found.
 */
function displayAll() {


}

