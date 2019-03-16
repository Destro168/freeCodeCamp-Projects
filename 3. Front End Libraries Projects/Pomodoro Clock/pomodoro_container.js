'use strict';

/**
 * Variables needed:
 * 
 * User defined variables
 * userInputSessionLength = 25
 * userInputBreakLength = 5
 * 
 * These vars control actual time remaining.
 * remainingMins = 25
 * remainingSeconds = 5
 * 
 * The state of the timer.
 * timerState = 'off', 'on', 'pause'
 * timerType: 'Session', 'Break'
 */

let state = {};

// Main React Class
class Pomodoro extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      timerState: 'off',
      timerType: 'Session',
      remainingBreaks: 3,
      userInput: {
        sessionLength: 25,
        breakLength: 5
      },
      remainingTime: {
        mins: 25,
        secs: 0
      }
    };

    this.clickStartStop = this.clickStartStop.bind(this);
    this.clickReset = this.clickReset.bind(this);

    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
  }
  
  // Helper functions to change timer state.
  setTimerStateOff() {
    state["timerState"] = 'off';
    this.setState(state);
  }

  setTimerStateOn() {
    state["timerState"] = 'on';
    this.setState(state);
  }

  setTimerStatePause() {
    state["timerState"] = 'pause';
    this.setState(state);
  }

  /**
   * User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in
   * id="session-length", even if the value has been incremented or decremented from the original value of 25.
   * User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.
   * User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.
   * User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of
   *  timer-label should display a string indicating a break has begun.
   * User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the
   *  value currently displayed in the id="break-length" element.
   * User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label
   *  should display a string indicating a session has begun.
   * User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the
   *  value currently displayed in the id="session-length" element.
   * User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize
   *  an HTML5 audio tag and have a corresponding id="beep".
   */
  clickStartStop() {
    state = Object.assign({}, this.state);
    
    // #20-26
    if (this.state["timerState"] == 'off' || this.state["timerState"] == 'pause') {
      // #18 - If timer is being turned on first time, then set remaining time to sessionLength.
      if (this.state["timerState"] == 'off') {
        state["remainingTime"]["mins"] = state["userInput"]["sessionLength"];
        state["remainingTime"]["secs"] = 0;
      }

      // Set time state to on.
      state["timerState"] = 'on';

      this.setTimerStateOn();

      // We use a series of functions here to organize recursive code.
      // doTimeDecrease: Actually performs operations to chnage time variables to decrease time by 1.
      // doClockTick: Function that calls itself every second until timer is off.
      function doTimeDecrease(boundFunction) {
        if (state["remainingTime"]["secs"] > 0) {
          state["remainingTime"]["secs"] = state["remainingTime"]["secs"] - 1;

          if (state["remainingTime"]["secs"] == 0) {
            (state["timerType"] == 'Session') ? state["timerType"] = 'Break' : state["timerType"] = 'Session';

            // Play the alarm.
            document.getElementById('beep').play();
          }
        }
        else if (state["remainingTime"]["mins"] > 0) {
          state["remainingTime"]["mins"] = state["remainingTime"]["mins"] - 1;
          state["remainingTime"]["secs"] = 59;
        }
        // Otherwise, handle processing for switching from session to break, or break to off.
        else {
          // If there are breaks remaining, keep alternating sessions and break;
          if (state["remainingBreaks"] > 0) {
            
            // If a session just ended, do a break.
            if (state["timerType"] == 'Session') {
              state["remainingTime"]["mins"] = state["userInput"]["sessionLength"];
              state["remainingTime"]["secs"] = 0;
              state["remainingBreaks"] -= 1;
            }

            // If a break just ended, do a session.
            else if (state["timerType"] == 'Break') {
              state["remainingTime"]["mins"] = state["userInput"]["breakLength"];
              state["remainingTime"]["secs"] = 0;
            }
          }
          // Otherwise, end.
          else {
            state["timerType"] = 'Session';
            state["timerState"] = 'off';
          }
        }
        
        boundFunction.setState(state);
      }
      
      function doClockTick(boundFunction) {
        setTimeout(function() {
          if (boundFunction.state["timerState"] == 'on') {
            doTimeDecrease(boundFunction);
            doClockTick(boundFunction);
          }
        }, 1000);
      }
      
      doClockTick(this);
    }

    // 20.
    else if (this.state["timerState"] == 'on') {
      this.setTimerStatePause();
    }
  }

  /**
   * User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should
   * return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state.
   * User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.
   */
  clickReset() {
    // Reset all variables. (Pure copy of constructor variables).
    let defaultState = {
      timerState: 'off',
      timerType: 'Session',
      remainingBreaks: 3,
      userInput: {
        sessionLength: 25,
        breakLength: 5
      },
      remainingTime: {
        mins: 25,
        secs: 0
      }
    }

    // Update state.
    this.setState(defaultState);

    // Audio stops playing and is rewound to the begining. (TODO)
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  /**
   * User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1,
   * and I can see the updated value.
   * User Story #16: I should not be able to set a session or break length to <= 0.
   */
  breakDecrement() {
    // Decrements value of #break-decrement by 1.
    let state = this.state;
    
    // #16.
    if (state["userInput"]["breakLength"] <= 1) {
      return;
    }

    state["userInput"]["breakLength"] -= 1;
    this.setState(state);
  }

  /**
   * User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1,
   * and I can see the updated value.
   * User Story #17: I should not be able to set a session or break length to > 60.
   */
  breakIncrement() {
    // Increases value of #break-increment by 1.
    let state = this.state;

     // #17.
     if (state["userInput"]["breakLength"] >= 60) {
      return;
    }

    state["userInput"]["breakLength"] += 1;
    this.setState(state);
  }

  /**
   * User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1,
   * and I can see the updated value.
   * User Story #16: I should not be able to set a session or break length to <= 0.
   */
  sessionDecrement() {
    // Decrements value of #session-decrement by 1.
    let state = this.state;

    // #16.
    if (state["userInput"]["sessionLength"] <= 1) {
      return;
    }

    state["userInput"]["sessionLength"] -= 1;
    this.setState(state);
  }

  /**
   * User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1,
   *  and I can see the updated value.
   * User Story #17: I should not be able to set a session or break length to > 60.
   */
  sessionIncrement() {
    // Increments value of #session-increment by 1.
    let state = this.state;
    
     // #17.
     if (state["userInput"]["sessionLength"] >= 60) {
      return;
    }

    state["userInput"]["sessionLength"] += 1;
    this.setState(state);
  }

  /** Private helper function to convert an integer time to a string with padding if less than 10. */
  getFormattedTime(timeInt) {
    return (timeInt < 10) ? ('0' + timeInt) : timeInt;
  }
  
  // User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format
  // (decrementing by a value of 1 and updating the display every 1000ms).
  //  Solution: Add a variable to p#time-left that is updated during the #start_stop onclick function (toggleActive). 

  // User Story #27: The audio element with id="beep" must be 1 second or longer.
  render() {
    return (
      <div id="main">

        <h1 id="title">Pomodoro Clock</h1>
        <div id="project">
          <div>
            <div className="topHalf">
              <div className="mainSection">
                <p id="break-label">Break Length</p>

                <div className="arrowBlock">
                  <button id="break-decrement" onClick={this.breakDecrement} className="fas fa-arrow-down"></button><br /><br />
                  <p className="pomo_p" id="break-length" defaultValue="5">{this.state.userInput.breakLength}</p>
                  <button id="break-increment" onClick={this.breakIncrement} className="fas fa-arrow-up"></button>
                </div>
              </div>

              <div className="mainSection">
                <p id="session-label">Session Length</p>

                <div className="arrowBlock">
                  <button id="session-decrement" onClick={this.sessionDecrement} className="fas fa-arrow-down"></button>
                  <p className="pomo_p" id="session-length" defaultValue="25">{this.state.userInput.sessionLength}</p>
                  <button id="session-increment" onClick={this.sessionIncrement} className="fas fa-arrow-up"></button>
                </div>
              </div>
            </div>

            <div className="mainSection">
              <div className="clockRing">
              <p id="timer-label" defaultValue="Session">{this.state.timerType}</p>
              <p id="time-left">{this.getFormattedTime(this.state.remainingTime.mins)}:{this.getFormattedTime(this.state.remainingTime.secs)}</p>
              <button id="start_stop" onClick={this.clickStartStop}>Start/Stop</button>
              <button id="reset" onClick={this.clickReset}>Reset</button>
              </div>
            </div>
          </div>
        </div>
        <audio src='audio/1.mp3' className="beep" id="beep">
          <source></source>
        </audio>
        <div id="notes">
          <h3>
            <p>Author's Note: This project was quite difficult to complete. I created a solution that 'worked', but the FCC tests wouldn't pass it.
            So, I wound up making my state variable for clickStartStop() global. This enabled my project to pass the tests.</p>
            
            <p>There were really two (2) big hhighlights for this project. First, there is the count-down algorithm for time. clickStartStop()
            calls doClockTick(), which recursively calls itself until the state changes from 'on'. As doClockTick() is called, the remaining
            time state properties are decreased. It will also change the state based on certain state values to enable the Pomodoro to progress
            through Session and Break phases.</p>

            <p>Next, there is the fact that there are 29 user stories to test against. Jeez, that's a lot. That's why I made sure to plan out
              my project and create a minimal skeleton for the project before coding anything significant. This can be viewed in the github
              commit history. Planning is overpowered! It made the large number of requirements quite easy to track and manage.</p>

            <p>A few traps that I fell into while coding this were to use a while loop to attempt to handle the count-down. Doing this
            with a setTimeout() function fails because delayed setTimeout() calls will be established before one even runs (within 1 second!).
            
            And, the second trap that I fell into was using a local state variable, rather than 'this' to pass state information
            to the count-down function.

            Thankfully, neither trap required much time or effort to resolve. This was a very fun challenge overall!</p>
          </h3>
        </div>
      </div>
    );
  }
}

/*
this.state = {
  timerState: 'off',
  userInput: {
    sessionLength: 25,
    breakLength: 5
  },
  remainingTime: {
    mins: 25,
    secs: 5
  }
*/

const domContainer = document.querySelector('#pomodoro_container');
ReactDOM.render(<Pomodoro />, domContainer);
