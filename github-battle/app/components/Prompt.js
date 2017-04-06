var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;

//This component only renders UI and has propTypes, no functions / methods.
// Use functional stateless component, no need for render method

// var Prompt = React.createClass({

//PropTypes enforeces datatypes for incoming data form props, otherwise
// throws error, so no username string will cause error, cant navigate from
// playerOne to playerTwo

//   propTypes: {
//     header: PropTypes.string.isRequired,
//     onUpdateUser: PropTypes.func.isRequired,
//     onSubmitUser: PropTypes.func.isRequired,
//     username: PropTypes.string.isRequired
//   },
//   render: function() {
//     return (
//       <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
//         <h1>{this.props.header}</h1>
//         <div className="col-sm-12">
//           <form onSubmit={this.props.onSubmitUser}>
//             <div className="form-group">
//               <input className="form-control"
//                      placeholder="Enter GitHub Username"
//                      onChange={this.props.onUpdateUser}
//                      value={this.props.username}
//                      type="text"
//               />
//             </div>
//             <div className="form-group col-sm-4 col-sm-offset-4">
//               <button className="btn btn-block btn-success" type="submit">Continue</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   }
// });

//No need to create class, stateless component!
function Prompt (props) {
  return (
        <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
          <h1>{props.header}</h1>
          <div className="col-sm-12">
            <form onSubmit={props.onSubmitUser}>
              <div className="form-group">
                <input className="form-control"
                       placeholder="Enter GitHub Username"
                       onChange={props.onUpdateUser}
                       value={props.username}
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

Prompt.propTypes = {
  header: PropTypes.string.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onSubmitUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

module.exports = Prompt;
