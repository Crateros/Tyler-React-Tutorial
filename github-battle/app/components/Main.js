var React = require('react');

//this.props.children will render the home component when we navigate to
// /home because home is a child of main in the routes! Any other routes
// that are children of Main would also get rendered if you visited the
// respective URL. NICE!

var Main = React.createClass({
  render: function () {
    return (
      //Cant use class (reserved word in javascript)
      <div className="main-container">
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;
