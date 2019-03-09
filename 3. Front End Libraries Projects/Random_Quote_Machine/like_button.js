'use strict';

const e = React.createElement;

const G_QUOTES = [
  'The stormy teaching transcribes the news',
  'The chalk compiles the sudden owner',
  'The fine driving orients the rub',
  'The amazing wound listens the year',
  'The war audits the measure',
  'The answer triples the thing',
  'The manager locates the abusive cause',
  'The nice sea discriminates the mine',
  'The well-to-do stone markets the slope',
];

const G_AUTHORS = [
  'Lucas',
  'Harper',
  'Michael',
  'Emily',
  'Alexander',
  'Elizabeth',
  'Ethan',
  'Avery',
  'Jackson'
];

const G_GEN_RAND_NUM = () => { return Math.floor(Math.random() * G_QUOTES.length); };

class LikeButton extends React.Component {
  
  constructor(props) {
    super(props);

    let randNum = G_GEN_RAND_NUM();

    this.state = {
      quote: G_QUOTES[randNum],
      author: G_AUTHORS[randNum]
    };

    this.generateNewQuote = this.generateNewQuote.bind(this);
  }

  generateNewQuote() {
    let randNum = G_GEN_RAND_NUM();

    this.setState({
      quote: G_QUOTES[randNum],
      author: G_AUTHORS[randNum]
    });
  }

  render() {
    return (
      <div id="quote-box" span="display: flex; justify-content: center">
        <q id="text">{this.state.quote}</q>
        <p id="author">{this.state.author}</p>
        <button type="button" className="btn btn-primary" id="new-quote" onClick={this.generateNewQuote}>Generate</button>
        <br />
        <a id="tweet-quote" className="twitter-share-button" href={'https://twitter.com/intent/tweet?text=' + this.state.quote} target='_blank'>
          Tweet
        </a>
      </div>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);