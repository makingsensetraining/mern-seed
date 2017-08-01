import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import autoBind from 'react-autobind';
import { Input, Textarea } from 'formsy-react-components';

class UserForm extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  submit(model) {
    this.props.onSave(model);
  }

  resetForm() {
    this.refs.form.reset();
  }

  render() {
    return (
      <div>
        <Formsy.Form ref="form" className="horizontal" onValidSubmit={this.submit} onValid={this.props.enableSubmit} onInvalid={this.props.disableSubmit}>
          <Input formNoValidate required name="name" label="Name" placeholder="Name" value={this.props.user.name || ''} />
          <Input formNoValidate required name="email" label="Email" placeholder="Email" value={this.props.user.email || ''}
            validations="isEmail"
            validationError="This is not a valid email" />
          <div>
            <button type="button" onClick={this.resetForm}>Reset</button>
            &nbsp;
            <input type="submit" disabled={!this.props.canSubmit} value={this.props.saving ? 'Saving... ' : 'Save'} />
            &nbsp;
            <Link to="/app/users">Cancel</Link>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  enableSubmit: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default UserForm;
