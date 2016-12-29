import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <IndexLink to="/" activeClassName="navbar-brand" className="navbar-brand"><i className="glyphicon glyphicon-check" /> MERN seed</IndexLink>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <IndexLink to="/" activeClassName="active"><i className="glyphicon glyphicon-home"/> Home</IndexLink>
                    </li>
                    <li>
                        <Link to="/app/users" activeClassName="active"><i className="glyphicon glyphicon-user"/> Users</Link>
                    </li>
                    <li>
                        <Link to="/app/about" activeClassName="active"><i className="glyphicon glyphicon-exclamation-sign"/> About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Header.propTypes = {
    //
};

export default Header;
