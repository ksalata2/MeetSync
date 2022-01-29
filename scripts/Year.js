/**
 * represents a single Year
 */
class Year{

    /**
     * creates a new Year
     * @param {number} yearNo the numerical representation of the Year
     */
    constructor(yearNo){
        this.yearNo = yearNo;
        this.months = [null, null, null, null, null, null, null, null, null, null, null, null]; // blank list of Months
    }

    /**
     * adds new Month to year
     * @param {number} monthNo from 1 - 12
     * @return {number} index inserted if successful, -1 otherwise
     */
    addMonth(monthNo){

        var m = new Month(monthNo);
        // new Month

        if(this.months[monthNo - 1] != null){
            // Month already exists
            return -1;
        }

        this.months[monthNo - 1] = m;
        // add new Month

        return monthNo - 1;
    }

    /**
     * gets entire Month object
     * @param {number} i the index (NOT the number) of the Month
     * @return {Month} Month that the user requests or null if it diesn't exist
     */
    getMonth(i){
        
        if(i >= months.length){
            // out of range
            return null;
        }

        return this.months[i];
    }

    /**
     * checks if month is in list
     * @param {number} month month that the user wants to check
     * @return {boolean} returns true if month is in list, false otherwise
     */
    hasMonth(month){
        if (this.months[month] != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * string representation of Year
     * to envoke this function implicitly
     * need to add empty string to object
     * @override of toString from class Object
     * @return the numerical representation of the year (temporary)
     */
    toString(){
        return this.yearNo.toString();
    }
}
