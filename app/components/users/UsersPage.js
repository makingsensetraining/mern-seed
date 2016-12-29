import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usersActions from '../../actions/userActions';

class UsersPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                Users list.
            </div>
        );
    }
}

UsersPage.propTypes = {
    //
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(usersActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(UsersPage);
