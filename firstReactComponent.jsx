var React = require('react');
var ReactDOM = require('react-dom');
var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        Hellow World!
      </div>
    )
  }
});
ReactDOM.render(<HelloWorld />, document.getElementById('app'));

// Every component is required to have a render method. The reason for that is render is essentially the template for our component.
// We’ve saved the result of calling our React.createClass constructor into a variable called HelloWorld. We do this because later on we’ll need to tell React to which element our component should be rendered. This is where ReactDOM.render comes into play. ReactDOM.render takes in two arguments. The first argument is the component you want to render, the second argument is the DOM node where you want to render the component. (Notice we’re using ReactDOM.render and not React.render. This was a change made in React .14 to make React more modular. It makes sense when you think that React can render to more things than just a DOM element). In the example above we’re telling React to take our HelloWorld component and render it to the element with an ID of app. Because of the parent/child child relations of React we talked about earlier, you usually only have to use ReactDOM.render once in your application because by rendering the most parent component, all child components will be rendered as well. If you want your whole app to be React, you would render the component to document.body.
