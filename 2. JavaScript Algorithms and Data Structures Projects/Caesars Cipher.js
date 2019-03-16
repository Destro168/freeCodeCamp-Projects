function rot13(str) {
    // Variable Initializations.
    let finalStr = "";
    let charCode;

    // For each character of the string, we will add it's ASCII char code shifted up by 13.
    str.split('').forEach(v => {
        // Get the ASCII number for the character.
        charCode = v.charCodeAt(0);

        // If it's a letter, then increase by 13.
        if (charCode >= 65 && charCode <= 90) {
            charCode += 13;

            // If above 90, the letter z, then wrap around.
            if (charCode > 90)
                charCode = 65 + (charCode - 91);
        }

        // Add the letter based on the new charCode.
        finalStr += String.fromCharCode(charCode);
    });

    // Return our final, shifted char string.
    return finalStr;
}

// Change the inputs below to test
rot13("SERR PBQR PNZC");