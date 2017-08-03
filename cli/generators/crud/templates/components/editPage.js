import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from '../../lib/autoBind';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import * as alertActions from '../../actions/alertActions';
import { alertMessage } from '../../helpers';
import <%= ucName %>Form from './<%= ucName %>Form';

class <%= ucName %>EditPage extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this, {
      bindOnly: ['handleSave']
    });

    props.actions.get<%= ucName %>(props.params.id);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  handleSave(<%= name %>) {
    let data = {
      id: this.props.<%= name %>.id,
      name: <%= name %>.name
    };

    this.props.actions.update<%= ucName %>(data);
  }

  render() {
    return (
      <div>
        <h1>Edit <%= ucName %></h1>
        <<%= ucName %>Form
          onSave={this.handleSave}
          saving={this.props.saving<%= ucName %>}
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
  <%= name %>: PropTypes.object,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    saving<%= ucName %>: state.reducers.saving<%= ucName %>,
    <%= name %>: state.reducers.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...<%= name %>Actions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>EditPage);
