import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import autoBind from 'react-autobind';

class User extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  onClickDetail(event) {
    event.preventDefault();
    this.props.onClickDetail(this.props.id);
  }

  onClickDelete(event) {
    event.preventDefault();
    this.props.onClickDelete(this.props.id);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <a href="" onClick={this.onClickDetail}>
            {this.props.id} - {this.props.name}
          </a>
        </div>
        <div className="panel-body">
          <p>
            {this.props.email}
            <Link to={`/app/users/${this.props.id}/edit`}>Edit</Link>
            <a href="" onClick={this.onClickDelete}>Delete</a>
          </p>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClickDetail: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default User;
