import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import * as alertActions from '../../actions/alertActions';
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
          saving={this.props.saving<%= ucName %>}
          canSubmit={this.props.canSubmit<%= ucName %>}
          enableSubmit={this.props.actions.enableSubmit<%= ucName %>}
          disableSubmit={this.props.actions.disableSubmit<%= ucName %>}
          <%= name %>={this.props.<%= name %>}
        />
      </div>
    );
  }
}

<%= ucName %>EditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  alert: PropTypes.object,
  saving<%= ucName %>: PropTypes.bool,
  canSubmit<%= ucName %>: PropTypes.bool,
  <%= name %>: PropTypes.object,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.alert,
    saving<%= ucName %>: state.saving<%= ucName %>,
    canSubmit<%= ucName %>: state.reducers.canSubmit<%= ucName %>,
    <%= name %>: state.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...<%= name %>Actions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>EditPage);
