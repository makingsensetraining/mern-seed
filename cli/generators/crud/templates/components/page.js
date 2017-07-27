import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import * as modalActions from '../../actions/modalActions';
import * as alertActions from '../../actions/alertActions';
import <%= ucName %>List from './<%= ucName %>List';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

export class <%= ucName %>Page extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);

    props.actions.load<%= pluralizedUcName %>();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      alertMessage(nextProps.alert);
    }
  }

  onClickDetail(<%= name %>Id) {
    this.props.actions.get<%= ucName %>(<%= name %>Id, true);
  }

  onClickDelete(<%= name %>Id) {
    this.props.actions.request<%= ucName %>Id(<%= name %>Id);
    this.props.actions.showModal('<%= name %>DetailsModal');
  }

  handleDelete() {
    this.props.actions.delete<%= ucName %>(this.props.<%= name %>ToDelete);
  }

  render() {
    return (
      <div>
        <h1><%= pluralizedUcName %> List</h1>
        <Link to="/app/<%= pluralizedName %>/add">Add</Link>
        <<%= ucName %>List
          <%= pluralizedName %>={this.props.<%= pluralizedName %>}
          onClickDetail={this.onClickDetail}
          onClickDelete={this.onClickDelete}
        />
        <Modal
          id="<%= name %>DetailsModal"
          title="<%= ucName %> Info"
          body={this.props.<%= name %>.name}
          modal={this.props.modal}
          close={this.props.actions.hideModal}
        />
        <ConfirmModal
          id="<%= name %>DeleteModal"
          title="Delete <%= ucName %>"
          body="Are you sure you want to delete this <%= name %>?"
          modal={this.props.modal}
          close={this.props.actions.hideModal}
          confirm={this.handleDelete}
        />
      </div>
    );
  }
}

<%= ucName %>Page.propTypes = {
  actions: PropTypes.object,
  alert: PropTypes.object,
  modal: PropTypes.object,
  <%= name %>ToDelete: PropTypes.string,
  <%= pluralizedName %>: PropTypes.array.isRequired,
  <%= name %>: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state.reducers,
    alert: state.reducers.alert,
    modal: state.reducers.modal,
    <%= name %>ToDelete: state.reducers.<%= name %>ToDelete,
    <%= pluralizedName %>: state.<%= pluralizedName %>.<%= pluralizedName %>,
    <%= name %>: state.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...<%= name %>Actions, ...modalActions, ...alertActions}, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>Page);
