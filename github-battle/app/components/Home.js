var React = require('react');
var transparentBg = require('../styles').transparentBg;
var ReactRouter = require('react-router');
var Link = require('react-router').Link;
var MainContainer = require('./MainContainer');


var Home = React.createClass({
  render: function () {
    return (
      <MainContainer>
        <h1>GitHub Battle</h1>
        <p className="lead">Some Fancy Motto!</p>
        <Link to='/playerOne'>
          <button type="button" className="btn btn-success btn-lg">Get Started</button>
        </Link>
      </MainContainer>
    )
  }
});

module.exports = Home;
