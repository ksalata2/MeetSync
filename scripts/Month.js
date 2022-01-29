/**
 * represents a single Month
 */
class Month{

    /**
     * list of Month names
     * dunno how to make this immutable so... don't
     */
    static monthNames = [
        ["January", 31],
        ["February", 29],
        ["March", 31],
        ["April", 30],
        ["May", 31],
        ["June", 30],
        ["July", 31],
        ["August", 31],
        ["September", 30],
        ["October", 31],
        ["November", 30],
        ["December", 31]
    ];

    /**
     * creates a new Month
     * @param {number} monthNo from 1 - 12
     */
    constructor(monthNo){
        this.monthNo = monthNo; // from 1 - 12, is this redundant?
        this.monthName = Month.monthNames[monthNo - 1][0]; // name of Month
        this.numDays = Month.monthNames[monthNo - 1][1]; // number of days in Month
        this.days = []; // blank list of Days
    }

    /**
     * adds a new Day
     * @param {number} dayNo the number that represents the Day (starts counting from 1)
     * @return {number} index inserted if successful, -1 otherwise
     */
    addDay(dayNo){

        if(dayNo > this.numDays){
            // Day out of range
            return -1;
        }

        var d = new Day(dayNo);
        // new Day

        return Common.insertSorted(d, this.days, function(a, b){
            
            if(a.dayNo > b.dayNo){
                // Day after next Day
                return 1;
            }

            else if(a.dayNo < b.dayNo){
                // Day before next Day
                return -1;
            }

            else{
                // Day same
                return 0;
            }
        });
    }

    /**
     * get entire Day object
     * @param {number} i index of Day to grab (NOT number of Day)
     * @return {Day} the Day object requested, or null if doesn't exist
     */
    getDay(i){

        if(i >= this.days.length){
            // out of range
            return null;
        }

        return this.days[i];
    }

    /**
     * checks if day is in list
     * @param {number} day day that the user wants to check
     * @return {boolean} returns true if day is in list, false otherwise
     */
    hasDay(day){
        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i] == day) {
                return true;
            }
        }
        return false;
    }

    /**
     * toString override
     */
    toString(){
        return this.monthName + " with " + this.numDays.toString() + " days"
    }
}
