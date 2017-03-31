// var app = document.getElementById('app');
// app.innerHTML = "Hello";

var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div> Hellow World I am React!</div>
    )
  }
});

ReactDOM.render(
  // Invoking component
  <HelloWorld />,
  document.getElementById('app')
);
