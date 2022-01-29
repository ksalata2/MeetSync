/**
 * represents a single Event
 */
class Event{
    /**
     * creates a single Event
     * @param {string} name the name of the Event
     * @param {number} day the day number  
     * @param {number} month the month number
     * @param {number} year the year number
     * @param {string} time the time of the event
     * @param {boolean} repeat if the user wants Event to auto repeat
     * @param {number} often how often the user would like to repeat
     * @param {number} priority low, medium, high priority
     */
    constructor(name, day, month, year, time, link, repeat, often, priority, date){
        this.name = name;
        this.day = day;
        this.month = month;
        this.year = year;
        this.time = time;
        this.link = link;
        this.repeat = repeat;
        this.often = often;
        this.priority = priority;
        this.date = date;
        this.alarm = null;
    }
}

