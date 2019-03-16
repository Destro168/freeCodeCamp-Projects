'use strict';

// Main React Class
class MarkdownEditor extends React.Component {
  
  constructor(props) {
    super(props);

    const startString = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
\/\/ this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

    this.state = {
      textArea1: startString
    };

    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleChange1(event) {
    this.setState({
      textArea1: event.target.value
    });
  }
  
  render() {
    return (
      <div id="main">
        <h1 id="title">Markdown Previewer</h1>
        <h3>
          Author's Note: The highlight of this markdown previewer was actually parsing the markdown myself. Rather than using the 'marked' library that can optionally be used,
          I decided to write my own markdown parser, because I'm an overachiever for no real reason apparently.
          Anyway, new markup can be added fairly effortlessly to my markdown language. And, changes to the syntax are equally easy.
          A big highlight of this highlight is that I had to get the code tags to work properly. Since I was using react's 'dangerouslySetInnerHTML' method to parse,
            the contents of textArea1 (the left one), I had to determine a solution to get the actual html contents in the textArea to display as text. After many hours,
            I settled on pre and post-processing during React lifecycle hooks to set the innerText values of each code element on the page. Fun!
        </h3>
        <div id="sideBySide">
          <textarea id="editor" defaultValue={this.state.textArea1} onChange={this.handleChange1}></textarea>

          <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.textArea1, {breaks: true})}}></div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#markdown_editor_container');
ReactDOM.render(<MarkdownEditor />, domContainer);

/**

** Legacy Code

* JSX:
{<div id="preview" dangerouslySetInnerHTML={{ __html: this.getFinalText()}}></div>

* Functions in <MarkdownEditor />:
updateCodeBlocks() {
    var text = this.getFinalText().matchAll('<code class="codeBlock">.*?</code>');
    var matchesArray = [];
    
    for (let match of text) {
      matchesArray.push(match[0].replace(/<code class="codeBlock">(.*?)<\/code>/, '$1'));
    }

    var list = document.getElementsByClassName("codeBlock");

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      element.textContent = matchesArray[index];
    }
  }

  componentDidMount() {
    this.updateCodeBlocks();
  }
  
  componentDidUpdate() {
    this.updateCodeBlocks();
  }
 
  
  getFinalText() {
    var text = this.state.textArea1;
    
    // This object holds all of our markup styles and their open/close tags.
    const notationObjs = {
      '#@': {
        openReplaceText: '<h1>',
        closereplacetext: '</h1>'
      },
      '##': {
        openReplaceText: '<h2>',
        closereplacetext: '</h2>'
      },
      '!@': {
        openReplaceText: '<a href="',
        closereplacetext: '">'
      },
      '!#': {
        openReplaceText: '</a>',
        closereplacetext: '</a>'
      },
      '-@': {
        openReplaceText: '<span class="grey">',
        closereplacetext: '</span>'
      },
      '&@': {
        openReplaceText: '<code class="codeBlock">',
        closereplacetext: '</code>'
      },
      '(@': {
        openReplaceText: '<ul><li>',
        closereplacetext: '</li></ul>'
      },
      '(#': {
        openReplaceText: '</li><li>',
        closereplacetext: '</li>'
      },
      '%@': {
        openReplaceText: '<blockquote>',
        closereplacetext: '</blockquote>'
      },
      '**': {
        openReplaceText: '<span class="bold">',
        closereplacetext: '</span>'
      },
      '^@': {
        openReplaceText: '<img src=',
        closereplacetext: '">'
      },
      '\\n': {
        openReplaceText: '<br />',
        closereplacetext: '<br />'
      },
      '\\t': {
        openReplaceText: '&nbsp;&nbsp;&nbsp;&nbsp;',
        closereplacetext: '&nbsp;&nbsp;&nbsp;&nbsp;'
      }

      // We store the text as an array of chars with all html tags stripped out immediately.
      const chars = text.split('');
      let finalText = '';
      let found;

      // Initialize notationObjs' sub-objects with state properties set to false.
      for (let o in notationObjs) {
        notationObjs[o]["state"] = false;
      }

      // Look for our sub-patterns at each character to find parsable markup.
      for (var i = 0; i < chars.length; i++) {
        found = false;

        for (let o in notationObjs) {
          const x = notationObjs[o];

          if (i < chars.length - o.length && chars.slice(i, i + o.length).join('') === o) {
            x["state"] = !x["state"];

            finalText = finalText.concat(x["state"] ? x["openReplaceText"] : x["closereplacetext"]);

            i += (o.length - 1);
            found = true;
          }
        }

        if (!found) {
          finalText = finalText + chars[i];
        }
      }

      return finalText;
    }
*/
