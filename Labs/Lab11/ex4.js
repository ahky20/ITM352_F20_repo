var values = ["2", "-3", "asdf", "-3.14156", "5"];
function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if(stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0) //simpler way of doing the things commented out below
}
    /*if (returnErrors) {
        return errors;
    }
    // this 
    if (errors.length == 0) { // No errors in errors array, return true
        return true;
    } 
    else {
        return false;
    }
    
    
    else                       // Found something in errors array, return false
    {
        return errors.length == 0;
    }
    */
    

/*for (i=0; i< values.length; i++) {
    console.log("String \' " + values[i] + "\' is " + isNonNegInt(values[i], true).join("||"));
    // this will tell if the value is a negative integer. If it is not, then it will say why.
}*/
console.log("*****");
// exercise 5 a
function callback(item, index) {
    errorsReturned = isNonNegInt(item, true).join("||");
    if (errorsReturned.length == 0) {
        console.log("String \' " + item + "\' is valid");
    } else {
        console.log("String \' " + item + "\' is " + errorsReturned);
    }
}

values.forEach(callback);
// exercise 5 b
values.forEach(
    function callback(item, index) {
        errorsReturned = isNonNegInt(item, true).join("||");
        if (errorsReturned.length == 0) {
            console.log("String \' " + item + "\' is valid");
        } else {
            console.log("String \' " + item + "\' is " + errorsReturned);
        }
    }
);