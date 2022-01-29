/**
 * overall Calendar data structure
 */
class Calendar{
    
    /**
     * list of events to continually loop and check for
     */
    static checklist = [];

    /**
     * location of save file
     */
    static filepath = "";

    constructor(){
        this.years = []; // blank list of Years
        this.userData = null; // extra data for each user
    }

    /**
     * adds a blank year to the calendar
     * @param {number} yearNo the numerical representation of the year to add
     * @return {number} index inserted if successful, -1 otherwise
     */
    addYear(yearNo){

        if(!(typeof yearNo === 'number')){
            // didn't provide a number
            throw 'not a number!';
        }

        var y = new Year(yearNo);
        // new blank year

        return Common.insertSorted(y, this.years, function(a, b){
            if(a.yearNo > b.yearNo){
                // year greater than next
                return 1;
            }

            else if(a.yearNo < b.yearNo){
                // year less than next
                return -1;
            }

            else{
                // years equal
                return 0;
            }
        });
    }

    /**
     * gets entire Year object
     * @param {number} i the index (NOT the Year number) to grab
     * @return {Year} the Year requested, or null if it doesn't exist
     */
    getYear(i){

        if(i >= this.years.length){
            // out of range
            return null;
        }

        return this.years[i];
    }

    /**
     * checks if year is in list
     * @param {number} year year that the user wants to check
     * @return {boolean} returns true if year is in list, false otherwise
     */
    hasYear(year){
        for (var i = 0; i < this.years.length; i++) {
            if (this.years[i] == years) {
                return true;
            }
        }
        return false;
    }

    /**
     * registers an Event as a push notification
     * @param {Event} event the Event to register
     * @return {alarm} the alarm object associated with this event
     */
    static registerNotif(event){
        
        if(event.repeat){
            // event repeats periodically
            chrome.alarms.create(event.name, {when: event.date.getTime(), periodInMinutes: event.often * 1440});
            // register alarm
            // for testing and demo purposes, this number is in minutes
            // realistically should be number of days (hence 1440 multiplier)
        }

        else{
            // event happens only once
            chrome.alarms.create(event.name, {when: event.date.getTime()});

        }

        var alarm = chrome.alarms.get(event.name, function(alarm){
            return alarm;
            // is this how you export alarm
            // nope
        });

        return alarm;
    }

    /**
     * initializes Calendar from file
     * @return {Calendar} if structure from file read successfully, null otherwise
     */
    static initFromFile(){
    
        console.log("initializing calendar!");

        try {
            var data = JSON.parse(localStorage.getItem("checklist"));
            console.log("testing: " + data);

            if(data == null){
                // read from file failed
                this.checklist = [];
            }

            else{
                this.checklist = data;

                for (var i = 0; i < this.checklist.length; i++) {
                    var temp = new Date(this.checklist[i].date);
                    this.checklist[i].date = temp;
                }
            }

        } catch(err) {
            this.checklist = [];
        }

        // For testing if the events were found
        if (this.checklist != null) {
            for(var i = 0; i < this.checklist.length; i++) {
                var temp = this.checklist[i];
                console.log(`\nAn event was found!`);
                console.log("Event name: " + temp.name);
                console.log("Event day: " + temp.day);
                console.log("Event time: " + temp.time);
                console.log("Meeting link: " + temp.link);
                console.log("\n");
            }
        }

        return data;
    }

    /**
     * saves Calender to file (probably JSON format)
     * @return {boolean} true if save successful, false otherwise
     */
    static saveToFile(){
        if (this.checklist == []) {
            return false;
        } else {
            localStorage.setItem("checklist", JSON.stringify(this.checklist));
            return true;
        }
    }

    /**
     * adds event to checklist, sorted
     * @param {Event} event the event to add
     * @return {number} index added, or -1 if fail
     */
    static addEvent(event){

        console.log("I happun ? ? ? ?");
        // this function never happens

        return Common.insertSorted(event, Calendar.checklist, function(a, b){
            
            console.log("I HAPPEN I RUN PLEASE NOTICE ME");

            console.log("new event: " + a.date.getTime());
            console.log("compare event: " + b.date.getTime());

            if(a.date.getTime() > b.date.getTime()){
                // new event comes after
                console.log("happens after!");
                return 1;
            }

            else if(a.date.getTime() < b.date.getTime()){
                // new event comes before
                console.log("happens before!");
                return -1;
            }

            else{
                // events happen at the same time
                return 0;
            }
        });
    }

    /**
     * searches for an event that matches name
     * @param {string} name the alarm to match
     * @return {Event} the event that matches the alarm or null if no match found
     */
    static matchNameEvent(name){

        for(var i = 0; i < Calendar.checklist.length; i++){
            // search entire list of events
            if(Calendar.checklist[i].name == name){
                // event found
                return Calendar.checklist[i];
            }
        }

        return null;
    }
}

Calendar.initFromFile();

// Error in event handler: TypeError: Cannot read property 'name' of undefined
// at Function.matchAlarmEvent (chrome-extension://dponmblkmkccjjpphhehbppoefnncjfd/scripts/Calendar.js:242:45)
// at chrome-extension://dponmblkmkccjjpphhehbppoefnncjfd/scripts/Background.js:8:26