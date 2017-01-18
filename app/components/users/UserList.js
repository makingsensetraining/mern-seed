import React, {PropTypes} from 'react';
import User from './User';

const UserList = ({users, onClick}) => {
    let usersView = <p>Sorry, there are no users to show. You can try to add one.</p>;
    if (users.length > 0) {
        usersView = users.map((user) =>
                <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    createdAt={user.createdAt}
                    onClick={onClick}
                />
        );
    }
    return (
        <div>
            {usersView}
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired
};

export default UserList;
