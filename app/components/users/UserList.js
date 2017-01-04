import React, {PropTypes} from 'react';
import User from './User';

const UserList = ({users}) => {
    let usersView = <p>Sorry, there are no users to show. You can try to add one.</p>;
    if (users.length > 0) {
        usersView = users.map((user) =>
                <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    createdAt={user.createdAt}
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
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default UserList;
