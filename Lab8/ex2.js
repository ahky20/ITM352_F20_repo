var number = 0;     // Counter for age
var myAge = 21;     // My age 

console.log("Counting Program for Ex2, with break");
while (number < myAge) {
    number++;
    if ((number >= myAge / 2) ) {   
        break;
    }
    console.log("Age=" + number);
}
console.log("Don't ask how old I am!");