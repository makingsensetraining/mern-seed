import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import <%= ucName %>Form from './<%= ucName %>Form';

class <%= ucName %>EditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      <%= name %>: Object.assign({}, props.<%= name %>),
      saving: false
    };

    this.handleSave = this.handleSave.bind(this);

    // TODO: Avoid when is already on the state?
    props.actions.get<%= ucName %>(props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ <%= name %>: Object.assign({}, nextProps.<%= name %>) });
  }

  handleSave(<%= name %>) {
    this.setState({ saving: true });

    let data = {
      id: this.state.<%= name %>.id,
      name: <%= name %>.name
    };

    this.props.actions.update<%= ucName %>(data)
      .then(() => {
        this.setState({ saving: false });
        toastr.success('<%= ucName %> updated successfully');
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
        <h1>Edit <%= ucName %></h1>
        <<%= ucName %>Form
          onSave={this.handleSave}
          saving={this.state.saving}
          <%= name %>={this.state.<%= name %>}
        />
      </div>
    );
  }
}

<%= ucName %>EditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  <%= name %>: PropTypes.object,
  params: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state,
    <%= name %>: state.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(<%= name %>Actions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>EditPage);
