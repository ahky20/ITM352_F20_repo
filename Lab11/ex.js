/*
retirement_target = 2052;
retirement_year = years_to_retire(retirement_target);

console.log("I am going to retire in " + retirement_year + " years");

function years_to_retire (retire_year) {
    this_year = 2020;
    return retire_year - this_year;
}

console.log();

{
    price = "10.13";
    dollar_part = parseInt(price);
}
*/
attributes  =  "Amber;21;MIS"; // don't put spaces or else it will appear in the console like this [ 'Amber', ' 21', ' MIS' ]

var Amber = attributes.split(";");

Amber_string = Amber.join(",");

console.log(Amber_string);
/*for (attrib of Amber) {
    console.log(attrib);
}
*/