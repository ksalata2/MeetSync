/**
 * represents a single Day
 */
class Day{

    /**
     * make a new Day
     * @param {number} dayNo number of Day (start counting from 1)
     */
    constructor(dayNo){
        this.dayNo = dayNo;
        this.events = []; // blank list of Events
    }

    /**
     * checks if there is an existing Event at that Date
     * @param {Event} d the Date to test for
     */
   /* eventConflict(d){
        for (var i = 0; i < this.events.length; i++) {
            var j = this.events[i];
            if (j.start.getHours() < d.finish.getHours()) {
                return true;
            } else if (j.start.getHours() == d.finish.getHours() && j.start.getMinutes() < d.finish.getMinutes()) {
                return true;
            } else if (d.start.getHours() < j.finish.getHours()) {
                return true;
            } else if (d.start.getHours() == j.finish.getHours() && d.start.getMinutes() < j.finish.getMinutes()) {
                return true;
            }
        }
        return false;
    }*/

    /**
     * Check to see if there are any conflicts with the newly
     * created event. Returns true if there is a conflict, false
     * otherwise.
     * 
     * @param {Event} event contains the event to check against
     */
    eventConflict(event) {

        for(var i = 0; i < Calendar.checklist.length; i++) {
            var temp = Calendar.checklist[i];
            if(temp.date.getTime() == event.date.getTime()/*temp.year == event.year && temp.name == event.name && temp.day == event.day && temp.time == event.time && temp.month == event.month*/) {
                return true;
            }
        }
        return false;
    }

    /**
     * adds new event in order based on time
     * @param {Event} event to add to day
     * @return index inserted if successful, -1 otherwise
     */
    addEvent(event){
        return Common.insertSorted(event, this.events, function(a, b){
            
            if(a.date > b.date){
                // new event comes after
                return 1;
            }

            else if(a.date < b.date){
                // new event comes before
                return -1;
            }

            else{
                // events happen at the same time
                return 0;
            }
        });
    }
}
