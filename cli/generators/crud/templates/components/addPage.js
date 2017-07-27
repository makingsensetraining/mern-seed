import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import * as alertActions from '../../actions/alertActions';
import { alertMessage } from '../../helpers';
import <%= ucName %>Form from './<%= ucName %>Form';

class <%= ucName %>AddPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  handleSave(<%= name %>) {
    this.props.actions.create<%= ucName %>(<%= name %>);
  }

  render() {
    return (
      <div>
        <h1>Add <%= ucName %></h1>
        <<%= ucName %>Form
          onSave={this.handleSave}
          saving={this.props.saving}
          canSubmit={this.props.canSubmit}
          enableSubmit={this.props.actions.enableSubmit}
          disableSubmit={this.props.actions.disableSubmit}
          <%= name %>={this.props.<%= name %>}
        />
      </div>
    );
  }
}

<%= ucName %>AddPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  saving: PropTypes.bool,
  canSubmit: PropTypes.bool,
  <%= name %>: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  let <%= name %> = {
    id: 0,
    name: ''
  };

  return {
    state: state.reducers,
    alert: state.reducers.alert,
    saving: state.reducers.saving,
    canSubmit: state.reducers.canSubmit,
    <%= name %>: <%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...<%= name %>Actions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>AddPage);
