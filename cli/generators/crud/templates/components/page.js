import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as <%= name %>Actions from '../../actions/<%= name %>Actions';
import <%= ucName %>List from './<%= ucName %>List';
import Modal from '../common/Modal';
import ConfirmModal from '../common/ConfirmModal';

export class <%= ucName %>Page extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      <%= name %>: Object.assign({}, props.<%= name %>)
    };

    this.onClickDetail = this.onClickDetail.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    props.actions.load<%= pluralizedUcName %>();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      <%= name %>: nextProps.<%= name %>
    });
  }

  onClickDetail(<%= name %>Id) {
    this.props.actions.get<%= ucName %>(<%= name %>Id)
      .then(() => {
        this.modal.open();
      })
      .catch(() => {
        toastr.error('The selected <%= name %> does not exist.');
      });
  }

  onClickDelete(<%= name %>Id) {
    this.setState({
      <%= name %>ToDelete: <%= name %>Id
    });
    this.<%= name %>DeleteModal.open();
  }

  handleDelete() {
    this.props.actions.delete<%= ucName %>(this.state.<%= name %>ToDelete)
      .then(() => {
        toastr.success('<%= ucName %> removed');
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1><%= pluralizedUcName %> List</h1>
        <Link to="/app/<%= pluralizedName %>/add">Add</Link>
        <<%= ucName %>List
          <%= pluralizedName %>={this.props.<%= pluralizedName %>}
          onClickDetail={this.onClickDetail}
          onClickDelete={this.onClickDelete} />
        <Modal
          title="<%= ucName %> Info"
          body={this.state.<%= name %>.name}
          ref={(child) => { this.modal = child; }} />
        <ConfirmModal
          title="Delete <%= ucName %>"
          body="Are you sure you want to delete this <%= name %>?"
          ref={(child) => { this.<%= name %>DeleteModal = child; }}
          confirm={this.handleDelete} />
      </div>
    );
  }
}

<%= ucName %>Page.propTypes = {
  actions: PropTypes.object,
  <%= pluralizedName %>: PropTypes.array.isRequired,
  <%= name %>: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
  return {
    state: state,
    <%= pluralizedName %>: state.<%= pluralizedName %>.<%= pluralizedName %>,
    <%= name %>: state.<%= name %>
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(<%= name %>Actions, dispatch)
  };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= ucName %>Page);
