var React = require('react');
var PropTypes = require('prop-types');

//Stateless functional component
function PlayerPreview(props) {
  console.log("Player Preview props: ", props);
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username} />
        <h2 className='username'>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  // onReset: PropTypes.func.isRequired,
  // id: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
