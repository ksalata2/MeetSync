/**
 * some common functions for everything to use
 */
class Common{

    /**
     * inserts item into array, sorted
     * is there a built in way to do this in JS? I feel like there should be
     * this is untested! doing that rn...
     * @param {any} item the item to put into the array
     * @param {Array} arr the array to insert into, sorted
     * @param {Function} cmp the comparator function, assume takes in 2 values, returns 1 for greater than, 0 for equal, -1 for less than
     * @return {number} index inserted if successful, -1 otherwise
     */
    static insertSorted(item, arr, cmp){

        var len = arr.length;
	
        if(len == 0){
            // no items in the array yet
            
            arr.push(item);
            // item becomes first in list

            return 0;
            // success
        }

        else if(cmp(item, arr[0]) == -1){
            // new item belongs at start of list
            
            arr.unshift(item);
            // put item in front of list

            return 0;
            // success
        }

        else if(cmp(item, arr[len - 1]) == 1){
            // new item belongs at end of list

            arr.push(item);
            // put item at end of list

            return arr.length - 1;
            // success
        }

        else{
            // item belongs somewhere else in array
            
            for(var i = 0; i < len; i++){

                if(cmp(item, arr[i]) == 0 || i == len - 1){
                    // item already exists in array or reached end of array
                    return -1;
                    // failure
                }

                if(cmp(item, arr[i]) == 1 && cmp(item, arr[i + 1]) == -1){
                    // item belongs between spots i and i + 1
                    
                    arr.splice(i + 1, 0, item);
                    // insert item into array

                    return i;
                    // success
                }
            }
        }
    }

    /**
     * launch camera test
     */
    camTest(){}

    /**
     * launch microphone test
     */
    micTest(){}
}
