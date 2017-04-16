var React = require('react');
//Render anchor tag
var Link = require('react-router-dom').Link;
//Render anchor tag, changes style based on route status (active vs inactive)
var NavLink = require('react-router-dom').NavLink;


function Nav () {
  return (
    <ul className='nav'>
      <li>
        {/* Exact property ensures that /battle or /popular doesnt also trigger active for
        home which is / */}
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
