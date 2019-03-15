'use strict';

const e = React.createElement;

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
 * Whether or not the timer is active.
 * timerIsActive = false
 */

// Main React Class
class Pomodoro extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      timeMinutes: 0,
      timeSeconds: 0
    };

    this.clickStartStop = this.clickStartStop.bind(this);
    this.clickReset = this.clickReset.bind(this);

    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
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
    
  }

  /**
   * User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should
   * return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state.
   * User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.
   */
  clickReset() {
    // Stop any running timers.

    // #break-length gets value reset to 5, the default.

    // #session-length gets value reset to 25, the default.

    // #time-left returns to default state.

    // Audio stops playing and is rewound to the begining.
  }

  /**
   * User Story #12: When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1,
   * and I can see the updated value.
   * User Story #16: I should not be able to set a session or break length to <= 0.
   */
  breakDecrement() {
    // Decrements value of #break-decrement by 1.

  }

  /**
   * User Story #13: When I click the element with the id of break-increment, the value within id="break-length" increments by a value of 1,
   * and I can see the updated value.
   * User Story #17: I should not be able to set a session or break length to > 60.
   */
  breakIncrement() {
    // Increases value of #break-increment by 1.

  }

  /**
   * User Story #14: When I click the element with the id of session-decrement, the value within id="session-length" decrements by a value of 1,
   * and I can see the updated value.
   * User Story #16: I should not be able to set a session or break length to <= 0.
   */
  sessionDecrement() {
    // Decrements value of #session-decrement by 1.

  }

  /**
   * User Story #15: When I click the element with the id of session-increment, the value within id="session-length" increments by a value of 1,
   *  and I can see the updated value.
   * User Story #17: I should not be able to set a session or break length to > 60.
   */
  sessionIncrement() {
    // Increments value of #session-increment by 1.

  }

  // User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format
  // (decrementing by a value of 1 and updating the display every 1000ms).
  //  Solution: Add a variable to p#time-left that is updated during the #start_stop onclick function (toggleActive). 

  // User Story #27: The audio element with id="beep" must be 1 second or longer.
  render() {
    return (
      <div id="main">
        <h1 id="title">Pomodor Clock</h1>
        <h3>
          Author's Note: TBC
        </h3>
        <div id="clock">

          <p id="break-label"></p>
          <p id="session-label"></p>

          <button id="break-decrement"></button>
          <button id="session-decrement"></button>
          
          <button id="break-increment"></button>
          <button id="session-increment"></button>

          <p id="break-length" defaultValue="5"></p>
          <p id="session-length" defaultValue="25"></p>
          <p id="timer-label"></p>
          
          <p id="time-left"></p>
          
          <button id="start_stop" onclick={this.clickStartStop}></button>
          <button id="reset" onClick={this.clickReset}></button>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#pomodoro_container');
ReactDOM.render(e(Pomodoro), domContainer);
