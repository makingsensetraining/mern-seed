import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const NotFound = (props) => {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you were looking for is not available.</p>
      <p> Please try again or go to &nbsp;
        <Link to="/" activeClassName="active"><i className="glyphicon glyphicon-home"/> Home</Link>
      </p>
    </div>
  );
};

NotFound.propTypes = {
  //
};

export default NotFound;
