function getMaxStep(steps, x) {
    return "blank";
}

// Takes integer and returns it converted to roman numerals.
function convertToRoman(num) {

    // Handle edge cases.
    if (num < 1 || num > 5000)
        return "Null";

    var roman_numerals = {
        1: "I",
        4: "IV",
        5: "V",
        9: "IX",
        10: "X",
        40: "XL",
        50: "L",
        90: "XC",
        100: "C",
        400: "CD",
        500: "D",
        900: "CM",
        1000: "M",
    };

    var steps = Object.keys(roman_numerals);
    var values = Object.values(roman_numerals);
    var finalStr = "";

    while (num > 0)
    {
        for (var i = steps.length-1; i > -1; i--)
        {
            console.log(steps[i] + " " + num);

            if (steps[i] <= num)
            {
                console.log(steps[i] + " " + num);

                num = num - steps[i];
                finalStr = finalStr + values[i];
                break;
            }
        }
    }
    
    console.log("Num: " + num + " FinalStr: " + finalStr);

    return finalStr;
}

convertToRoman(97);