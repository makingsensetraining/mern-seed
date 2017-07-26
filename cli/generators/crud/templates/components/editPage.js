import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import autoBind from 'react-autobind';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import { alertMessage } from '../../helpers';
import <%= ucName %>Form from './<%= ucName %>Form';

class <%= ucName %>EditPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    props.actions.get<%= ucName %>(props.params.id);
  }

  handleSave(<%= name %>) {
    let data = {
      id: this.props.<%= name %>.id,
      name: <%= name %>.name
    };

    this.props.actions.update<%= ucName %>(data);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  render() {
    return (
      <div>
        <h1>Edit <%= ucName %></h1>
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

<%= ucName %>EditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  saving: PropTypes.bool,
  canSubmit: PropTypes.bool,
  <%= name %>: PropTypes.object,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.alert,
    saving: state.saving,
    canSubmit: state.reducers.canSubmit,
    <%= name %>: state.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(<%= name %>Actions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>EditPage);
