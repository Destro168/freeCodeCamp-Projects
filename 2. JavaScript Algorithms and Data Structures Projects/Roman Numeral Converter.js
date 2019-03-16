/**
 * Takes integer and returns it converted to Roman Numerals in a string.
 * @param {number} num Some integer.
 * @returns {string} Roman Numerals in a string.
 */
function convertToRoman(num) {
    // Handle edge cases.
    if (num < 1 || num > 5000)
        return "Null";

    // Constant object containing all roman number symbols.
    const romanNumerals = {
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

    // More variables based on object.
    var steps = Object.keys(romanNumerals);
    var values = Object.values(romanNumerals);
    var finalStr = "";

    /* This section repeatedly attemps to find the highest Roman Numeral that can be subtracted from 'num' while keeping it above 0.
        Once such a number is found, it subtracts that Roman Numerals integer amount from 'num' and adds the character to the finalStr. */
    while (num > 0)
    {
        for (var i = steps.length-1; i > -1; i--)
        {
            if (steps[i] <= num)
            {
                num = num - steps[i];
                finalStr = finalStr + values[i];
                break;
            }
        }
    }
    
    // Return our final roman numeral string.
    return finalStr;
}

convertToRoman(97);