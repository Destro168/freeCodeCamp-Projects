function palindrome(str) {
  // First, prepare array by filtering non-word chars,
  //  setting to lowercase and making string an array of chars.
  str = str.replace(/[\W._]/g, "").toLowerCase().split('');

  // If str is too short (aka not a word), return.
  if (str.length < 1)
    return false;

  // Store center value in advance so not recalculated each iteration.
  var center = Math.floor(str.length / 2);

  // Second, actually perform palindrone checking operation.
  for (var i = 0; i < str.length; i++)
  {
    // If we are at the str's center, it must be a palindrone: return true.
    if (i == center) {
      return true;
    }

    // Count up from bottom and down from top while comparing
    //  each recod to verify if a palindrone. If any check fiails, return false.
    if (str[i] != str[str.length-i-1]) {
      return false;
    }
  }
}

palindrome("1 eye for of 1 eye.");