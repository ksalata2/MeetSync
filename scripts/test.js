/**
 * just some testing code
 */

// testing insertSorted

console.log('testing insertSorted...');

arr = [];

var i, j;

for(i = 0; i < 10; i++){

    j = Math.floor(Math.random() * 100);

    Common.insertSorted(j, arr, function(a, b){
        if(a > b){
            return 1;
        }

        else if(a < b){
            return -1;
        }

        else{
            return 0;
        }
    });
}

console.log('testing Calendar...');

cal = new Calendar();

for(i = 0; i < 10; i++){

    j = Math.floor(Math.random() * 10000);

    cal.addYear(j);
}

console.log('' + cal.years);
// this doesn't work
// this works! gotta add empty string... because reasons
// gotta add empty string to trigger toString



for(i = 0; i < 10; i++){
    console.log(cal.years[i]);
}


console.log('testing Month...');

for(i = 1; i <= 12; i++){
    cal.years[0].addMonth(i);
}

console.log("" + cal.years[0].months);
