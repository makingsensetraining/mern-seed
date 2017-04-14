import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Input from '../common/form/Input';
import validateInput from './UserForm.validation';

class UserForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
      errors: {},
      touched: {
        username: false,
        password: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    this.setState({ errors });
    return isValid;
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBlur(e) {
    const field = e.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.isValid();
  }

  handleSubmit(e) {
    e.preventDefault();

    //As we have to show all errors on form submit, we set as touched all fields.
    this.setState({
      touched: {
        username: true,
        password: true
      }
    });

    if (!this.isValid())
      return;

    this.setState({ errors: {} });
    this.props.onUserFormSubmit(this.state.username, this.state.password);
  }

  render() {
    return (
      <form
        className="login-form"
        noValidate
        onSubmit={this.handleSubmit}>
        <Input
          type="email"
          name="username"
          label="Email"
          autoFocus={true}
          value={this.state.username}
          touched={this.state.touched.username}
          error={this.state.errors.username}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={this.state.password}
          touched={this.state.touched.password}
          error={this.state.errors.password}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <input
          className="btn btn--primary"
          type="submit"
          value="Send" />
      </form>
    );
  }
}

UserForm.propTypes = {
  onUserFormSubmit: PropTypes.func.isRequired,
  logInProgress: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default UserForm;
