import React, {PropTypes} from 'react';

const User = ({id, name, email, onClick}) => {
    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <a href="" onClick={onClick} id={id}>
                    {id} - {name}
                </a>
            </div>
            <div className="panel-body">
                <p>{email}</p>
            </div>
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default User;
