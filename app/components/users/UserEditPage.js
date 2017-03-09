import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';

class UserEditPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, props.user),
            saving: false
        };

        this.handleSave = this.handleSave.bind(this);

        // TODO: Avoid when is already on the state?
        props.actions.getUser(props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: Object.assign({}, nextProps.user) });
    }

    handleSave(user) {
        this.setState({ saving: true });

        let data = {
            id: this.state.user.id,
            name: user.name,
            email: user.email
        };

        this.props.actions.updateUser(data)
            .then(() => {
                this.setState({ saving: false });
                toastr.success('User updated successfully');
                browserHistory.push('/app/users');
            })
            .catch(error => {
                this.setState({ saving: false });
                toastr.error(error.description);
            });
    }

    render() {
        return (
            <div>
                <h1>Edit User</h1>
                <UserForm
                    onSave={this.handleSave}
                    saving={this.state.saving}
                    user={this.state.user}
                />
            </div>
        );
    }
}

UserEditPage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object,
    params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UserEditPage);
