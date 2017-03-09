import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const User = ({id, name, email, onClickDetail, onClickDelete}) => {
    return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <a href="" onClick={onClickDetail} id={id}>
                    {id} - {name}
                </a>
            </div>
            <div className="panel-body">
                <p>
                    {email}
                    <Link to={`/app/users/${id}/edit`}>Edit</Link>
                    <a href="" onClick={onClickDelete} id={id}>Delete</a>
                </p>
            </div>
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onClickDetail: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
};

export default User;
