/**
 * Simulates purchases by taking three args as input. Returns a realistic state for the register based on inputs.
 * @param {*} price Price of goods.
 * @param {*} cash Cash provided by customer.
 * @param {*} cid A sorted array containing cash in the drawer.
 */
function checkCashRegister(price, cash, cid) {
    // First, determine how much change is required as a numerical value.
    var requiredChange = cash - price;

    // Object to return when register is closed.
    var closedObject = {
        status: "CLOSED",
        change: cid
    }
    var successObject = {
        status: "OPEN",
        change: []
    };

    /* Second, attempt to form that change using the cid object.
      To get change, continually remove the largest available currency until exact change is given.
      If we are unable to provide a 'largest currency', then return that there is not enough change. */

    // Define currency system to be used.
    var currency = [0.01, 0.05, 0.10, 0.25, 1.00, 5.00, 10.00, 20.00, 100.00];
    var remainingCurrency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var currentCurrencyDeduction = 0;
    var tempCurrentAmount = 0;
    var thereIsCash = false;

    // While we still need to give change, keep looking for change to give.
    while (requiredChange > 0) {

        // For each item in the cash register, deduct the highest available currency until none is left.
        for (var i = cid.length - 1; i > -1; i--) {

            // Store the relevant information into more human-friendly variables. In this case, currency amount.
            tempCurrentAmount = cid[i][1];

            // Store that remaining currency in another variable to preserve it's value for operations much later on.
            remainingCurrency[i] = tempCurrentAmount;

            // If we still require change and the currenct currency has enough value to provide... then,
            if (requiredChange > 0) {

                // While we have enough cash in register and removing the cash doesn't make our balance negative.
                while (cid[i][1] >= currency[i] && (requiredChange - currency[i]) >= 0) {

                    // Reduce currency in register, decrease required change and increase record of how much was deducted.
                    cid[i][1] -= currency[i];
                    cid[i][1] = cid[i][1].toFixed(2);

                    requiredChange -= currency[i];
                    requiredChange = requiredChange.toFixed(2);

                    currentCurrencyDeduction += currency[i];
                }
            }

            // If we deducted money, then....
            if (currentCurrencyDeduction > 0) {

                // Store whether there is cash remaining.
                if (cid[i][1] > 0)
                    thereIsCash = true;

                // Push the deduction to our success object that we return in the end.
                successObject.change.push([cid[i][0], currentCurrencyDeduction]);

                // Set currentCurrencyDeduction to zero, so it's reset for the next currency.
                currentCurrencyDeduction = 0;
            }
        }
    }

    // If there is change required to pay, we return the default object according to project description specs.
    if (requiredChange > 0) {
        return {
            status: "INSUFFICIENT_FUNDS",
            change: []
        };
    }

    // Check if there is leftover money.
    if (!thereIsCash) {
        // A temporary closed object to hold change.
        var tempclosedObject = {
            status: "CLOSED",
            change: [],
        };

        // Just want to loop with index on closedObject, so 'v' is unused. We store in tempClosedObj cash types and remaining currency amounts.
        closedObject.change.forEach((v,i) => tempclosedObject.change.push([cid[i][0], remainingCurrency[i]]));

        return tempclosedObject;
    }

    return successObject;
}

checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])