function rot13(str) {
    var myArray = str.split('');
    var finalStr = "";
    var charCode = 0;

    for (var i = 0; i < myArray.length; i++) {
        charCode = myArray[i].charCodeAt(0);

        if (charCode >= 65 && charCode <= 90) {
            charCode += 13;

            if (charCode > 90)
                charCode = 65 + (charCode - 91);
        }

        finalStr += String.fromCharCode(charCode);
    }

    return finalStr;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");