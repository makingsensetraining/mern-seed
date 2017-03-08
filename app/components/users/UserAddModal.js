import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropModal } from 'boron';
import toastr from 'toastr';

import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';

class UserAddModal extends React.Component {
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

    open() {
        this.refs.modal.show();
    }

    hide() {
        this.refs.modal.hide();
    }

    handleSave(user) {
        this.setState({ saving: true });
        this.props.actions.createUser(user)
            .then(() => {
                toastr.success('User created successfully');
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
                                <h2 className="modal-title">Add User</h2>
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

UserAddModal.propTypes = {
    size: PropTypes.string,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object
};

UserAddModal.defaultProps = {
    size: 'md'
};

function mapStatesToProps(state, ownProps) {
    let user = {
        id: 0,
        name: '',
        email: '',
        createdAt: ''
    };

    return {
        state: state,
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps, null, { withRef: true })(UserAddModal);
