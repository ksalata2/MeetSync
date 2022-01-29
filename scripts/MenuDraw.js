/**
 * for drawing menus
 * works by dynamically showing/hiding elements
 */

//localStorage.clear();
// in event that invalid date is stored somewhere
// just for testing purposes, comment this out otherwise

/**
 * list of different views (menus) in our program
 * view names are class names
 * doesn't actually do anything, just a list to remind ourselves what menus exist
 */
const views = ["dailyView", "addEventView", "monthlyView", "allView"];

/**
 * colors corresponding to priority of event
 */
const priorityColors = ["green", "orange", "red"];

/**
 * the initial "previous" view is the daily overview
 */
var prevView = "dailyView";

/**
 * render daily events to screen
 */
showDayEvents();

/**
 * render monthly events, don't display yet
 */
showMonthEvents();

/**
 * render all events, don't display yet
 */
showAllMeetings();

/**
 * show the default view
 */
showView(prevView);

/**
 * Button to go back to main menu from 'View Calendar'
 */
var back = document.getElementById("back");
back.onclick = function() {
    function hi() {
        console.log("hello there");
    }
    document.getElementById("lookUp").value = '';
    showView("searchAnEvent");
    changeView("dailyView");
}

/**
 * Button to go back to main menu from 'Add new event'
 */
var goBack = document.getElementById("goBack");
goBack.onclick = function() {
    showView("searchAnEvent");
    changeView("dailyView");
}

var mainMenuBtns = document.getElementsByClassName("mainMenu");
// all buttons that are for returning to main menu
for(var i = 0; i < mainMenuBtns.length; i++){
    mainMenuBtns[i].onclick = function(){
        showView("searchAnEvent");
        changeView("dailyView");
        // main menu is daily view
    };
}

/**
 * button for viewing Calendar
 */
var viewCal = document.getElementById("viewCal");
viewCal.onclick = function(){
    // Change view to select an option
    hideView("searchAnEvent");
    changeView("calOptions");
}

// Month button was clicked
// note do not have this run showMonthEvents
// instead have this just reveal the monthlyView
var meetingsMonth = document.getElementById("monthAll");
meetingsMonth.onclick = function() { 
    changeView("monthlyView");
}

// Show all meetings
// note do not have this run showAllMeetings
// instead have this just reveal the view with all meetings
var meetingsWeek = document.getElementById("meetAll");
meetingsWeek.onclick = function() {
    changeView("allView");
}

/**
 * button for adding new Event
 */
var addEvent = document.getElementById("addEvent");
addEvent.onclick = function(){
    hideView("searchAnEvent");
    changeView("addEventView");
    // change view to add Event menu
}

/**
 * Searches for an event in calendar by name
 */
var findIt = document.getElementById("searching");
findIt.onclick = function() {
    
    var eventName = document.getElementById("lookUp").value;
    
    if(eventName === ""){
        // user typed in nothing
        document.getElementById("lookUp").value = '';
        return;
    }

    var searchResult = document.getElementById("searchResult");
    // spot to put the search result

    var result = null;
    // results of the search

    if(Calendar.checklist.link == 0) {
        console.link("There are no events on your calendar");
        result = "There are no events on your calendar";
    }
    else {
        
        for(i = 0; i < Calendar.checklist.length; i++) {
            var temp = Calendar.checklist[i];
            
            if(temp.name.includes(eventName) == true){
                // matching event exists in calendar
                
                console.log(`\nAn event was found!`);
                printEvent(temp);
                
                result = temp.name + " on " + Month.monthNames[temp.month - 1][0] + ", " + temp.day + ", " + temp.year + " at " + temp.time + ", priority: " + temp.priority;
                // get pertinent details of event

                break;
            }
        }

        if(result == null){
            // event not found
            result = "Event not found";
        }
    }
    
    document.getElementById("lookUp").value = '';
    // clear search box

    searchResult.innerHTML = result;
    // put event on screen
}

/**
 * button for submitting new Event
 */
var submit = document.getElementById("submit");
submit.onclick = function(){

    var d = new Date();
    // current date as of pushing the button

    var newName = document.getElementById("name").value;
    var newYear = document.getElementById("year").value;
    var newMonth = document.getElementById("month").value;
    var newDay = document.getElementById("day").value;
    var newTime = document.getElementById("time").value;
    var newPriority = document.getElementById("priority").value;
    var newLink = document.getElementById("link").value;
    var repeat = document.getElementById("repeat").checked;
    var newOften = parseInt(document.getElementById("often").value);
    
    var timeSplit = newTime.split(":");
    // split hour and minute components

    let hour = parseInt(timeSplit[0]);
    let min = parseInt(timeSplit[1]);

    let date = new Date(newYear, newMonth-1, newDay, hour, min);
    if(date == null){
        console.log("date format not recognized!");
    }

    // Create new event
    var newEvent = new Event(newName, newDay, newMonth, newYear, newTime, newLink, repeat, newOften, newPriority, date);

    // Create new day and add event to corresponding day. Check for conflicts
    var dayNo = new Day(newDay);
    if(dayNo.eventConflict(newEvent) == true) {
        console.log("There is a another meeting scheduled at the same time");
        document.getElementById("conflict").style.display = "block";
        // show warning
        return;
    }
    else {
        // no conflict
        dayNo.addEvent(newEvent);
        // successfully add day

        // date is valid
        document.getElementById("conflict").style.display = "none";
        // hide warning
        
    }

    // Create new month and add a day
    var monthNo = new Month(newMonth);
    monthNo.addDay(newDay);
    monthNo.days.push(dayNo);

    // Create new Calendar Year
    var yearNo = new Year(newYear);
    yearNo.addMonth(newMonth);

    // Create new Calendar
    var cal = new Calendar();
    cal.addYear(parseInt(newYear));

    //Calendar.checklist.push(newEvent);
    console.log("result of addEvent to checklist " + Calendar.addEvent(newEvent));
    newEvent.alarm = Calendar.registerNotif(newEvent);
    // properly register new event

    // Clear all fields after submittion
    clearFields();
    
    showView("searchAnEvent");
    // show search bar again

    // Just to test that values are entered in boxes
    console.log("name entered " + newName);
    console.log("year entered " + newYear);
    console.log("month entered " + newMonth);
    console.log("day entered " + newDay);
    console.log("time entered " + repeat);
    console.log("frequency entered " + newOften);
    console.log("priority entered " + newPriority);
    console.log("\n\n");

    // render daily events to screen 
    showDayEvents();

    // render monthly events, don't display yet
    showMonthEvents();

    // render all events, don't display yet
    showAllMeetings();

    Calendar.saveToFile();

    changeView("dailyView");
}

/**
 * simulates a user entering events into the calendar
 * call this from the console to populate calendar
 * @param {number} numEvents number of random events to add to calendar
 */
function simRun(numEvents){

    // for the sake of easy testing all of the random events will happen on the same day
    // check current day, put all events at random times on that day

    var d = new Date();
    // current date as of pushing the button

    var newYear = d.getFullYear();
    var newMonth = d.getMonth();
    var newDay = d.getDate();
    // all test events happen today

    for(var i = 0; i < numEvents; i++){
        // generate requested number of events

        var hour = Math.floor(Math.random() * 24);
        // random hour of the day

        var min = Math.floor(Math.random() * 60);
        // random minute of the hour

        var hourString = ("" + hour).padStart(2, "0");
        var minString = ("" + min).padStart(2, "0");
        var timeString = hourString + ":" + minString;
        // string representation of time

        var date = new Date(newYear, newMonth, newDay, hour, min);
        // random date for event

        var newName = "test " + i;
        // not so random name of event

        var repeat = Math.floor(Math.random() * 2) == 1 ? true : false;
        // random value for repeating value

        var newOften = Math.floor(Math.random() * 11);
        // random value to repeat (between 0 and 10 minutes)

        var newPriority = Math.floor(Math.random() * 3) + 1;
        // random priority

        var newEvent = new Event(newName, newDay, newMonth + 1, newYear, timeString, "", repeat, newOften, newPriority, date);
        // create new calendar event

        var dayNo = new Day(newDay);
        // new day object
        if(dayNo.eventConflict(newEvent) == true){
            // event happens on existing date and time
            console.log("There is a another meeting scheduled at the same time");
            continue;
        }

        else{
            // no conflict
            dayNo.addEvent(newEvent);
        }

        var monthNo = new Month(newMonth + 1);
        monthNo.addDay(newDay);
        monthNo.days.push(dayNo);
        // create new month and add a day

        var yearNo = new Year(newYear);
        yearNo.addMonth(newMonth + 1);
        // create new year

        var cal = new Calendar();
        cal.addYear(newYear);
        // create new calendar

        console.log("result of addEvent to checklist " + Calendar.addEvent(newEvent));
        newEvent.alarm = Calendar.registerNotif(newEvent);
        // register new event

        console.log("name entered " + newName);
        console.log("year entered " + newYear);
        console.log("month entered " + newMonth + 1);
        console.log("day entered " + newDay);
        console.log("time entered " + repeat);
        console.log("frequency entered " + newOften);
        console.log("priority entered " + newPriority);
        console.log("date happen " + date);
        console.log("\n\n");
    }

    // render daily events to screen 
    showDayEvents();

    // render monthly events, don't display yet
    showMonthEvents();

    // render all events, don't display yet
    showAllMeetings();

    Calendar.saveToFile();
}

/**
 * swap out views
 * @param {string} view name of the view to change to
 */
function changeView(view){

    hideView(prevView);
    // hide the previous menu

    showView(view);
    // show the current menu

    prevView = view;
    // set new previous view
}

/**
 * hides objects within a particular view
 * @param {string} view the name of the view to hide
 */
function hideView(view){

    var elem = document.getElementsByClassName(view);
    // elements to hide

    for(var i = 0; i < elem.length; i++){
        elem[i].style.display = "none";
        // hide each element by that class name
    }
}

/**
 * shows objects within a particular view
 * @param {string} view the name of the view to show
 */
function showView(view){

    var elem = document.getElementsByClassName(view);
    // elements to show

    for(var i = 0; i < elem.length; i++){
        elem[i].style.display = "block";
        // show each element by that class name
    }
}

/**
 * generates list item from event, shows relevant details for daily view
 * @param {Event} event the event to convert to a list item
 * @return {HTMLElement} a list item representing the event
 */
function eventListDay(event){

    var listItem = document.createElement("LI");
    listItem.innerHTML = event.name + " at " + event.time + ", priority: " + event.priority;
    // pertinent data for this event

    listItem.onclick = function(){
        window.open(event.link, "_blank");
    }
    // click list item to go to meeting

    listItem.style.color = priorityColors[parseInt(event.priority) - 1];
    // set color of list item

    return listItem;
}

/**
 * generates list item from event, shows relevant details for monthly view
 * @param {Event} event the event to convert to a list item
 * @return {HTMLElement} a list item representing the event
 */
function eventListMonth(event){

    var listItem = document.createElement("LI");
    listItem.innerHTML = event.name + " on " + event.day + " at " + event.time + ", priority: " + event.priority;
    // pertinent data for this event

    listItem.onclick = function(){
        window.open(event.link, "_blank");
    }
    // click list item to go to meeting

    listItem.style.color = priorityColors[parseInt(event.priority) - 1];
    // set color of list item

    return listItem;
}

/**
 * generates list item from event, shows relevant details for entire calendar view
 * @param {Event} event the event to convert to a list item
 * @return {HTMLElement} a list item representing the event
 */
function eventListAll(event){

    var listItem = document.createElement("LI");
    listItem.innerHTML = event.name + " on " + Month.monthNames[event.month - 1][0] + ", " + event.day + ", " + event.year + " at " + event.time + ", priority: " + event.priority;
    // pertinent data for this event

    listItem.onclick = function(){
        window.open(event.link, "_blank");
    }
    // click list item to go to meeting

    listItem.style.color = priorityColors[parseInt(event.priority) - 1];
    // set color of list item

    return listItem;
}

/**
 * Will display events from the day
 * call this function ONCE at startup or whenever new day happens
 */
function showDayEvents() {
    
    var d = new Date();

    var dailyList = document.getElementById("dailyList");
    dailyList.textContent = "";
    // unsorted list of events in the day
    // clear list if it has anything
    // later on add a way to sort events by time

    // Check if calendar is empty
    if(Calendar.checklist.length == 0) {
        console.log("There are no meetings today.");
    }
    else { 
        // Loop through events 
        var flag = 0;
        var counter = 1;
        for(i = 0; i < Calendar.checklist.length; i++) {
            var temp = Calendar.checklist[i];
            if(temp.day == d.getDate() && temp.month == (d.getMonth() + 1 ) && temp.year == d.getFullYear()) {
                
                console.log(`Event #${counter}`);
                printEvent(temp);
                // show in console for debugging purposes

                var listItem = eventListDay(temp);
                dailyList.appendChild(listItem);
                // add event to list

                counter++;
                flag = 1;
            }
        }

        if(flag == 0) {
            console.log("No events were found for today");
        }
    }   
}

/**
 * Will display events for the entire month
 * call this function ONCE at startup or when new month happens
 */
function showMonthEvents() {

    var d = new Date();

    var monthlyList = document.getElementById("monthlyList");
    monthlyList.textContent = "";
    // unsorted list of events in the month
    // clear list if it has anything

    // Check if calendar is empty
    if(Calendar.checklist.length == 0) {
        console.log("No meetings were found for this month");
    }
    else {
        var counter = 1;
        for(i = 0; i < Calendar.checklist.length; i++) {
            var temp = Calendar.checklist[i];
            if(temp.month == (d.getMonth() + 1) && temp.year == d.getFullYear()) {
                
                console.log(`Event #${counter}`);
                printEvent(temp);
                // show in console for debugging purposes

                var listItem = eventListMonth(temp);
                monthlyList.appendChild(listItem);
                // add event to list

                counter++;
            }
        }
    }   
}

/**
 * Will display all events in the calendar
 * call this function ONCE on startup
 */
function showAllMeetings() {
    
    var allList = document.getElementById("allList");
    allList.textContent = "";
    // unsorted list of all events in month
    // clear list if it has anything

    if(Calendar.checklist.length == 0) {
        console.log("You do not have any meetings!");
    }
    else {
        var counter = 1;
        for(i = 0; i < Calendar.checklist.length; i++) {
            
            var temp = Calendar.checklist[i];
            console.log(`Event #${counter}`);
            
            var listItem = eventListAll(temp);
            allList.appendChild(listItem);
            // add event to list

            printEvent(temp);
            counter++;
        }
    }
}

/**
 * Will clear all fields from form once the
 * submit button has been clicked
 */
function clearFields() {
    document.getElementById("name").value = '';
    document.getElementById("year").value = '';
    document.getElementById("month").value = '';
    document.getElementById("day").value = '';
    document.getElementById("time").value = '';
    document.getElementById("priority").value = '';
    document.getElementById("repeat").value = '';
    document.getElementById("often").value = '';
    document.getElementById("link").value = '';
}

/**
 * Function to print details about the event
 */
function printEvent(temp) {
    console.log("Event name: " + temp.name);
    console.log("Event day: " + temp.day);
    console.log("Event time: " + temp.time);
    console.log("Meeting link: " + temp.link);
    console.log("\n");
}