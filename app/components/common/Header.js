import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/"> MERN seed</IndexLink>
      <ul>
        <li>
          <IndexLink to="/">Home</IndexLink>
        </li>
        <li>
          <Link to="/app/users">Users</Link>
        </li>
        <li>
          <Link to="/app/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Header.propTypes = {
  //
};

export default Header;
