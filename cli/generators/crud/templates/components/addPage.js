import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import <%= ucName %>Form from './<%= ucName %>Form';

class <%= ucName %>AddPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      <%= name %>: Object.assign({}, props.<%= name %>),
      saving: false
    };

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(<%= name %>) {
    this.setState({ saving: true });
    this.props.actions.create<%= ucName %>(<%= name %>)
      .then(() => {
        this.setState({ saving: false });
        toastr.success('<%= ucName %> created successfully');
        browserHistory.push('/app/<%= pluralizedName %>');
      })
      .catch(error => {
        this.setState({ saving: false });
        toastr.error(error.description);
      });
  }

  render() {
    return (
      <div>
        <h1>Add <%= ucName %></h1>
        <<%= ucName %>Form
          onSave={this.handleSave}
          saving={this.state.saving}
          <%= name %>={this.state.<%= name %>}
        />
      </div>
    );
  }
}

<%= ucName %>AddPage.propTypes = {
  actions: PropTypes.object.isRequired,
  <%= name %>: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  let <%= name %> = {
    id: 0,
    name: ''
  };

  return {
    state: state,
    <%= name %>: <%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(<%= name %>Actions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>AddPage);
