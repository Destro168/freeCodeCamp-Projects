/**
 * Simulates purchases by taking three args as input.
 * @param {*} price Price of goods.
 * @param {*} cash Cash provided by customer.
 * @param {*} cid A sorted array containing cash in the drawer.
 */
function checkCashRegister(price, cash, cid) {

    // First, determine how much change is required as a numerical value.
    var requiredChange = price - cash;

    // Create the return object. By default, we assume the fail case.
    var failObject = {
        status: "INSUFFICIENT_FUNDS",
        change: []
    };
    var successObject = {
        status: "CLOSED",
        change: []
    };

    /* Second, attempt to form that change using the cid object.
      To get change, continually remove the largest available currency until exact change is given.
      If we are unable to provide a 'largest currency', then return that there is not enough change. */

    // Define currency system to be used.
    var currency = [0.01, 0.05, 0.10, 0.25, 1.00, 5.00, 10.00, 20.00, 100.00];
    // 100.00, 20.00, 10.00, 5.00, 1.00, 0.25, 0.10, 0.05, 0.01

    var totalDeduction;

    // While we still need to give change, keep looking for change to give.
    while (requiredChange > 0) {
        // For each item in the cash register, deduct the highest available currency until none is left.
        for (var i = cid.length - 1; i > -1; i--) {
            totalDeduction = 0;

            while ((cid[i][1] - currency[i]) < requiredChange) {
                cid[i][1] -= currency[i];
                totalDeduction += currency[i];
            }
            
            if (totalDeduction > 0) {
                successObject.change.push([cid[i][0], totalDeduction]);
            }
        }
    }

    if (requiredChange > 0) {
        return failObject;
    }

    if (requiredChange == 0) {
        successObject.status = "CLOSED";
    }

    return successObject;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);