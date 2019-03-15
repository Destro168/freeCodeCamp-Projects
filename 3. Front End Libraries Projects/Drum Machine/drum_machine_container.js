'use strict';

const e = React.createElement;

/**
User Story #1: I should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements.

User Story #2: Within #drum-machine I can see an element with a corresponding id="display".

User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes
  the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.

User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip,
  a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).

User Story #5: When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.

User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be
  triggered (e.g. pressing the Q key should trigger the drum pad which contains the string "Q", pressing the W key should trigger the drum pad which contains the string "W", etc.).

User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).
*/

const drumPadData = [
  ['Q','banjo C3 1', 'audio/1.mp3'],
  ['W','banjo C3 2', 'audio/2.mp3'],
  ['E','banjo C4 1', 'audio/3.mp3'],
  ['A','banjo C4 2', 'audio/4.mp3'],
  ['S','banjo C5 1', 'audio/5.mp3'],
  ['D','banjo C5 2', 'audio/6.mp3'],
  ['Z','banjo C6 1', 'audio/7.mp3'],
  ['X','banjo C#3 1', 'audio/8.mp3'],
  ['C','banjo C#3 2', 'audio/9.mp3']
];

// Main React Class
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAudioDescription: 'No audio',
      currentlyPlayingAudioNode: null
    };

    this.updateAudioDescription = this.updateAudioDescription.bind(this);
  }
  
  componentDidMount() {
    document.body.onkeypress = (event) => {
      for (var i = 0; i < drumPadData.length; i++) {
        if (event.key.toLocaleLowerCase() == drumPadData[i][0].toLocaleLowerCase()) {
          document.getElementById(drumPadData[i][1]).click();
          return;
        }
      }
    };
  }

  updateAudioDescription(event) {
    var an_State = this.state.currentlyPlayingAudioNode;
    var an_Event = event.target.childNodes[1];

    // Stop currently playing node if one is set.
    if (an_State == an_Event) {
      an_Event.currentTime = 0;

      if (an_State.ended) {
        an_Event.play();
      }
    }
    else if (an_State !== null) {
      an_State.pause();
      an_State.currentTime = 0;
      an_Event.play();
    }
    else {
      an_Event.play();
    }

    this.setState({
      currentAudioDescription: event.target.id,
      currentlyPlayingAudioNode: an_Event
    });
  }

  render() {
    let drumpadButtons = [];
    
    for (var index = 0; index < 9; index++) {
      drumpadButtons[index] = <button className="drum-pad" id={drumPadData[index][1]} key={index * 100} onClick={this.updateAudioDescription}>
        {drumPadData[index][0]}
        <audio src={drumPadData[index][2]} className="clip" id={drumPadData[index][0]}>
          <source></source>
        </audio>
      </button>
    }

    return (
      <div id="main">
        <h1 id="title">Drum Machine</h1>
        <h3>
          Author's Note: -
        </h3>
        <div id="drum-machine">
          <div id="display">
            {drumpadButtons}
            <p>{this.state.currentAudioDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#drum_machine_container');
ReactDOM.render(e(DrumMachine), domContainer);
