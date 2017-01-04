import React, {PropTypes} from 'react';

const User = ({id, name, email}) => {
    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                {id} - {name}
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
    email: PropTypes.string.isRequired
};

export default User;
