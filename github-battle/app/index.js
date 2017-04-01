// var app = document.getElementById('app');
// app.innerHTML = "Hello";

// fn(d) = V --> function that takes in (data) and outputs a View

//React components should be F.I.R.S.T.
  // Focused
  // Independent
  // Reusable
  // small
  // Testable

var USER_DATA = {
  name: "Donnie Ellstrom Codes React",
  username: "Crateros",
  image: 'https://avatars1.githubusercontent.com/u/17658464?v=3&s=460'
}

var React = require('react');
var ReactDOM = require('react-dom');

// var HelloWorld = React.createClass({
//   render: function() {
//     console.log(this.props)
//     return (
//       <div> Hello World I am React! My creator is {this.props.name} and I am {this.props.anyDataHere} years old. </div>
//     )
//   }
// });

var ProfilePic = React.createClass({
  render: function () {
    return <img src={this.props.imageURL} style={{height: 100, width: 100}} />
  }
});

//this.props.children will render anything between the <Link></Link> tags where it gets
// instantiated by the parent
var Link = React.createClass({
changeURL: function () {
  window.location.replace(this.props.href)
},
  render: function () {
    return (
      <span style={{color: 'blue', cursor: 'pointer'}}
        onClick={this.changeURL}>
        {this.props.children}
      </span>
    )
  }
})

var ProfileLink = React.createClass({
  render: function () {
    return (
      <div>
        <Link href={'https://www.github.com/' + this.props.username}>
          {this.props.username}
        </Link>
      </div>
    )
  }
});

var ProfileName = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.name}
      </div>
    )
  }
});

var Avatar = React.createClass({
  render: function () {
    return (
      <div>
        <ProfilePic imageURL={this.props.user.image} />
        <ProfileName name={this.props.user.name} />
        <ProfileLink username={this.props.user.username} />
      </div>
    )
  }
});

ReactDOM.render(
  // Invoking component
  <Avatar user={USER_DATA} />,
  document.getElementById('app')
);
