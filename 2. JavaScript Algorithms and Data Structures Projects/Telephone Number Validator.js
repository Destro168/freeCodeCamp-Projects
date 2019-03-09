// Takes string 'x'.
function isNum(x) {
    return (x.search(/[0-9]/g) != -1) ? true : false;
}

function checkValid(str, template) {

    console.log("A: " + str + " " + template);

    // make sure length is the same.
    if (str.length != template.length)
        return false;

    var chars = str.split('');
    var templateChars = template.split('');

    console.log("B: ");

    if (templateChars[0] == "1" && chars[0] != "1")
      return false;
    
    // If any illegal characters, return.
    for (var i = 0; i < templateChars.length; i++) {
        console.log(i + " " + chars[i] + " " + templateChars[i]);

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

    console.log("Check");
    return true;
}

function telephoneCheck(str) {
    // Encode formats for comparison.
    var allowedTemplates = [
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

    for (var j = 0; j < allowedTemplates.length; j++) {
        if (checkValid(str, allowedTemplates[j])) {
            console.log("Passed template? " + allowedTemplates[j]);
            return true;
        } else {
            console.log("IT FAILED");
        }
    }

    console.log("Is false.");

    return false;
}

telephoneCheck("1 555-555-5555");