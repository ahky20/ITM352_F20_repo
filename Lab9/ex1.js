var day = 26;
var month = 9;
var year = 1999;
var StrYear = String(year);
var lastTwo = StrYear.slice(2,4);
var step1 = Number(lastTwo); // step1=99
var step2=parseInt(step1/4); // = 24.75
var step3 = step2 + step1;   // = 24 + 99
var step4 = 5;               // Not Jan, so look at month before Sept. on table
var step5 = step3 + day;     // Yes the month is Sept Jan. doesn't apply in this situation
var step6 = step4 + step3;   // = 128
var step7 = step6 + day;     // = 154
var step8 = step7;
var final = step8 % 7;       // = 0