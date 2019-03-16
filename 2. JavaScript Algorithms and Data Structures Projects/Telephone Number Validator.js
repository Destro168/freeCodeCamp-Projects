/**
 * Returns true if the character 'x' is a number, else false.
 * @param {char} x Some character.
 */
function isNum(x) {
    return (x.search(/[0-9]/g) != -1) ? true : false;
}

/**
 * Returns true if the string matches a template and false if it doesn't.
 * @param {string} str The string to test
 * @param {string} template One of the constant templates.
 */
function checkValid(str, template) {
    // make sure length is the same between string and template.
    if (str.length != template.length)
        return false;

    var chars = str.split('');
    var templateChars = template.split('');

    if (templateChars[0] == "1" && chars[0] != "1")
      return false;
    
    // If any illegal characters, return.
    for (var i = 0; i < templateChars.length; i++) {
        if (templateChars[i] == "0" && !isNum(chars[i])) {
            return false;
        } else if (templateChars[i] == "(" && chars[i] != "(") {
            return false;
        } else if (templateChars[i] == ")" && chars[i] != ")") {
            return false;
        } else if (templateChars[i] == "-" && chars[i] != "-") {
            return false;
        } else if (templateChars[i] == " " && chars[i] != " ") {
            return false;
        }
    }

    return true;
}

/**
 * Returns true if str is a valid number, and false if it isn't.
 * @param {string} str A string containing numbers in some format.
 */
function telephoneCheck(str) {
    // Encode formats for comparison.
    const allowedTemplates = [
        "000-000-0000",
        "(000)000-0000",
        "(000) 000-0000",
        "000 000 0000",
        "0000000000",
        "1 000 000 0000",
        "1 000-000-0000",
        "1 (000) 000-0000",
        "1(000)000-0000"
    ]

    // Compare the string to every template. Return true if it matches.
    for (var j = 0; j < allowedTemplates.length; j++) {
        if (checkValid(str, allowedTemplates[j])) {
            return true;
        }
    }

    // Else, return false.
    return false;
}

telephoneCheck("1 555-555-5555");