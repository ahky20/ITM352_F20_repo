var day = 3;
var month = 8;
var year = 2013;
var StrYear = String(year);
var lastTwo = StrYear.slice(2,4);
var step1 = Number(lastTwo); // step1=13
var step2=parseInt(step1/4); // = 3
var step3 = step2 + step1;   // = 16
var step4 = 2;               // Not Jan, so look at month before on table
var step5 = step3 + day;     // Yes the month is Jan. doesn't apply in this situation
var step6 = step4 + step3;   // = 18
var step7 = step6 + day;
var step8 = step7;