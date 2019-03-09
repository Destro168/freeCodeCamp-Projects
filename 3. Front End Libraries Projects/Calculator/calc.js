'use strict';

// React magic.
const e = React.createElement;

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    // this.state.numbers is an array of strings.
    this.state = {
      curNumberIndex: 0,
      input: {
        numbers: [],
        operations: []
      },
      display: '0',
      answer: '',
      doClear: false,
      error: ''
    };
  }

  /**
   * Shows some error message below the calculator.
   * @param {string} text The text to display in the error.
   */
  showError(text) {
    this.setState({
      error: text
    });

    const isEqual = () => {
      return (this.state.error === text);
    }

    const resetState = () => {
      this.setState({
        error: ''
      });
    }

    setTimeout(function () {
      if (isEqual()) {
        resetState();
      }
    }, 5000);
  }

  /**
   * Reset's state of calculator to initial state.
   * @param {boolean} keepAnswer Whether or not to preserve the state's answer as 
   *  the first number in the next operation sequence.
   * @param {boolean} newDisplayInitAsZero True sets newDisplay to '0'. Otherwise, ''.
   */
  performClear(keepAnswer, newDisplayInitAsZero) {
    this.setState((prevState) => {
      var newDisplay = (newDisplayInitAsZero) ? '0' : '';
      var newAnswer = '';
      var newNumArr = [];

      if (keepAnswer == true && prevState.answer != '') {
        newAnswer = prevState.answer;
        newDisplay = prevState.answer;
        newNumArr = [newAnswer];
      }

      return {
        curNumberIndex: 0,
        input: {
          numbers: newNumArr,
          operations: []
        },
        display: newDisplay,
        answer: newAnswer,
        doClear: false
      }
    });
  }

  /**
   * Routes program logic based on user key press.
   * @param {char} key A key press.
   */
  processButtonPress(key) {
    // If the clear button, then...
    if (key == 'AC') {
      // Always clear.
      this.performClear(false, true);
    }

    // If a number, then...
    else if (/[\d\.]+/ig.test(key)) {

      // Store current number for ease of access.
      var curNumber = this.state.input.numbers[this.state.curNumberIndex];
      var doingAsyncClear = false;

      // Perform a clear if clear flag is set.
      if (this.state.doClear) {
        this.performClear(false, false);
        doingAsyncClear = true;
      }

      var newDisplayValue = '';

      // Handle decimal characters.
      if (key == '.') {

        // If the first part of a number is a decimal, add a 0 to make pretty (and also for future float conversion).
        if (doingAsyncClear || (!curNumber || curNumber.length == 0)) {
          key = '0.';
        }

        // Prevent adding multiple decimals to a number input.
        if (!doingAsyncClear && /[\.]+/gi.test(curNumber)) {
          this.showError("You already have a decimal in the current number.");
          return;
        }
      }
      // Otherwise, we need to perform special handling for display value of '0'.
      else if (this.state.display == '0') {
        newDisplayValue = key;
      }

      this.setState((prevState) => {
        // Vars.
        var numArr;
        var numArrIndex;

        // Special handling for display value of '0'.
        if (newDisplayValue == '') {
          newDisplayValue = prevState.display.concat(key);
        }

        // Special processing for asynchronous clear call.
        if (doingAsyncClear) {
          numArr = [];
          numArrIndex = undefined;
        } else {
          numArr = prevState.input.numbers;
          numArrIndex = numArr[prevState.curNumberIndex];
        }

        var x = '';
        var y = [];

        // Get the new string value that we will be adding to array.
        if (!numArrIndex) {
          x = key;
        } else {
          x = numArrIndex + key;
        }

        // Add new string value based on array state.
        if (numArr == undefined || numArrIndex == undefined) {
          numArr.push(x);
          y = numArr;
        } else if (numArr != undefined && numArrIndex == undefined) {
          numArr.push(x);
          y = numArr;
        } else if (numArr != undefined && numArrIndex != undefined) {
          numArr.pop();
          numArr.push(x);
          y = numArr;
        } else {
          this.showError("Unknown operation.");
        }

        // Return new object with y added.
        return {
          curNumberIndex: prevState.curNumberIndex,
          input: {
            numbers: y,
            operations: prevState.input.operations
          },
          display: newDisplayValue,
          answer: prevState.answer
        }
      });
    }

    // For equal sign press.
    else if (key == '=') {
      if (this.state.doClear) {
        this.showError("The answer is already visible.");
        return;
      }

      if (!this.state.input.numbers || !this.state.input.operations ||
        this.state.input.numbers < 2 || this.state.input.operations < 1) {
        this.showError("Please enter at least two (2) numbers and one (1) operator to perform a calculation.");
        return;
      }

      this.processInput();
    }

    // Else, if an operator sign.
    else {
      // Variable definitions.
      var newOperations;
      var newDisplay;
      
      // Clear, but make sure to leave the previous answer for this operator logic.
      if (this.state.doClear) {
        this.performClear(true, true);
        newOperations = [key];
        newDisplay = key;
      }
      
      // Update state.
      this.setState((prevState) => {
        
        // If no numbers have been entered yet, show error and return.
        if (prevState.input.numbers == undefined || prevState.input.numbers.length == 0) {
          this.showError("Cannot add operator without a proceeding number.");
          return;
        }

        // If the last entered item was an operator, replace it with the new operator.
        if ((prevState.input.numbers.length - prevState.input.operations.length) == 0) {
          newDisplay = prevState.display.split('').slice(0, prevState.display.length-1).concat([key]).join('');
          newOperations = prevState.input.operations.slice(0, prevState.input.operations.length-1).concat([key]);
        }

        // Else, If we didn't set the operationsArr already (due to the clear above), then attempt to set.
        else if (newOperations == undefined) {
          // Add key to operationsArr based on its state as empty or having data already.
          if (!prevState.input.operations || prevState.input.operations.length == 0) {
            newOperations = [key];
            newDisplay = prevState.display.concat(key);
          } else {
            newOperations = [...prevState.input.operations, key];
            newDisplay = prevState.display.concat(key);
          }
        }
        
        return {
          curNumberIndex: ++prevState.curNumberIndex,
          input: {
            numbers: prevState.input.numbers,
            operations: newOperations
          },
          display: newDisplay,
          answer: prevState.answer
        }
      });
    }

    return;
  }

  /**
   * A helper function that performs an operation on values a and b.
   * @param {string} a First value in operation.
   * @param {string} b Second value in operation
   * @param {char} operation The operation to perform.
   */
  calculate(a, b, operation) {
    // Convert strings to floats.
    a = parseFloat(a);
    b = parseFloat(b);

    if (operation == '+') {
      return a + b;
    } else if (operation == '-') {
      return a - b;
    } else if (operation == '*') {
      return a * b;
    } else if (operation == '/') {
      return a / b;
    }
  }

  /**
   * This function uses state information to calculate an equation's answer when called.
   */
  processInput() {
    var newAnswer = 0;

    if (this.state.input.numbers.length == 0) {
      newAnswer = 'NAN';
    } else if (this.state.input.numbers.length == 1) {
      newAnswer = x.numbers[0];
    } else {
      // Remove dangling operators.
      if (this.state.input.numbers.length == this.state.input.operations.length) {
        this.state.input.operations.pop();
      }

      // Perform one round of calculations manually to set newAnswer.
      newAnswer = this.calculate(this.state.input.numbers[0], this.state.input.numbers[1], this.state.input.operations[0])

      // Loop through remaining numbers until there are none left.
      let count = 2;

      while (this.state.input.numbers[count] != null) {
        newAnswer = this.calculate(newAnswer, this.state.input.numbers[count], this.state.input.operations[count - 1]);
        count++;
      }
    }

    // display: prevState.display + " = " + newAnswer,
    this.setState((prevState) => {
      return {
        display: newAnswer,
        answer: newAnswer,
        doClear: true
      }
    });
  }

  /**
   * React render method.
   */
  render() {
    // Vars.
    let uniqueId = 1083;
    const operators = ['+', '-', '*', '/'];
    const operatorIds = ["divide", 'multiply', "subtract", "add"];
    const numberButtonIds = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const elemOrder = ['AC', '/', '*', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '=', 0, '.'];
    const misc = ['clear', 'equals', 'decimal'];
    let web_HTML = [];
    let operatorCount = 0;
    let miscCount = 0;

    // Display the formula and answer section.
    web_HTML.push(<div id="displayContainer" className="card" key={uniqueId++}>
      <div id="display" className="card-body">{this.state.display}</div>
    </div>);

    // Continue by displaying each button based on order in elemOrder array.
    elemOrder.forEach(v => {
      if (typeof v === 'number') {
        web_HTML.push(<button id={numberButtonIds[v]} type="button" className="btn btn-primary" onClick={() => this.processButtonPress(v.toString())} key={uniqueId++}>{v}</button>);
      }
      else if (operators.indexOf(v) != -1) {
        web_HTML.push(<button id={operatorIds[operatorCount]} type="button" className="btn btn-primary" onClick={() => this.processButtonPress(v)} key={uniqueId++}>{v}</button>);
        operatorCount++;
      }
      else {
        web_HTML.push(<button id={misc[miscCount]} type="button" className="btn btn-primary" onClick={() => this.processButtonPress(v)} key={uniqueId++}>{v}</button>);
        miscCount++;
      }
    });

    // Return all of web_HTML wrapped by a div container. (that sets grid settings.)
    return (
      [
          <div className="container" key={uniqueId++}>
            <h1 id="titleHeader">A Simple Calculator</h1>
            <h3 id="footerHeader">By: Donald Abdullah-Robinson</h3>
            {web_HTML}
            <h3 id="error">{this.state.error}</h3>
          </div>
      ]
    );
  }
}

// More react magic.
const domContainer = document.querySelector('#calculator_container');
ReactDOM.render(e(Calculator), domContainer);