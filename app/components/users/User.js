import React, {PropTypes} from 'react';

const User = ({id, name, email, onClickDetail, onClickEdit, onClickDelete}) => {
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
                    <a href="" onClick={onClickEdit} id={id}>Edit</a>
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
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
};

export default User;
