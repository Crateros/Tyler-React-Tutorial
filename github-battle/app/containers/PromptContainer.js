var React = require('react');
var transparentBg = require('../styles').transparentBg;

//To establish state, use getInitialState, common practice to set this
// to empty datatype
//onUpdateUser takes in event coming from input field
//onSubmitUser, cache the current entry to username,
// then reset state using this.setState in case user presses back button

var PromptContainer = React.createClass({
  //This allows you to pass items to components without going through props,
  // this does not scale well, but works great for react-router, so we dont have
  // to pass the router down from the parent to all the children
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
        username: ''
    }
  },
  onUpdateUser: function(event) {
    this.setState({
      username: event.target.value
    })
  },
  onSubmitUser: function(event) {
    event.preventDefault();
    var username = this.state.username;
    this.setState({
      username: ''
    });
    //:playerOne is a custom params of playerTwo route set in routes, if truthy
    if (this.props.routeParams.playerOne) {
      console.log("this.context 1: ", this.context);
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      })
      //Go to /battle
    }
    else {
      console.log("this.context 2:", this.context);
      //If falsy Go to playerTwo
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },
  render: function() {
    console.log("this! ", this);
    return (
      <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
        <h1>{this.props.route.header}</h1>
        <div className="col-sm-12">
          <form onSubmit={this.onSubmitUser}>
            <div className="form-group">
              <input className="form-control"
                     placeholder="Enter GitHub Username"
                     onChange={this.onUpdateUser}
                     value={this.state.username}
                     type="text"
              />
            </div>
            <div className="form-group col-sm-4 col-sm-offset-4">
              <button className="btn btn-block btn-success" type="submit">Continue</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = PromptContainer;
