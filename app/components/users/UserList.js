import React, {PropTypes} from 'react';
import User from './User';

const UserList = ({users, onClickDetail, onClickEdit, onClickDelete}) => {
    let usersView = <p>Sorry, there are no users to show. You can try to add one.</p>;
    if (users.length > 0) {
        usersView = users.map((user) =>
                <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    onClickDetail={onClickDetail}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete} />
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
    onClickDetail: PropTypes.func.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
};

export default UserList;
