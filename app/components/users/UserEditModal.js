import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropModal } from 'boron';
import toastr from 'toastr';

import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';

class UserEditModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: Object.assign({}, props.user),
            saving: false
        };

        this.open = this.open.bind(this);
        this.hide = this.hide.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // Required to populate user form data when the action finished.
        this.setState({ user: Object.assign({}, nextProps.user) });
    }

    open(userId) {
        this.props.actions.getUser(userId)
            .then(() => {
                this.refs.modal.show();
            })
            .catch(() => {
                toastr.error('There was an error getting the User detail', 'Error');
            });
    }

    hide() {
        this.refs.modal.hide();
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
                toastr.success('User updated successfully');
                this.setState({ saving: false });
                this.hide();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({ saving: false });
            });
    }

    render() {
        return (
            <div>
                <DropModal ref="modal">
                    <div className={`modal-${this.props.size}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.hide}>×</button>
                                <h2 className="modal-title">Edit User</h2>
                            </div>
                            <div className="modal-body">
                                <UserForm
                                    onSave={this.handleSave}
                                    onClose={this.hide}
                                    saving={this.state.saving}
                                    user={this.state.user}
                                />
                            </div>
                            <div className="modal-footer" />
                        </div>
                    </div>
                </DropModal>
            </div>
        );
    }
}

UserEditModal.propTypes = {
    size: PropTypes.string,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
};

UserEditModal.defaultProps = {
    size: 'md'
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

export default connect(mapStatesToProps, mapDispatchToProps, null, { withRef: true })(UserEditModal);
