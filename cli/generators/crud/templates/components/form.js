import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';

class <%= ucName %>Form extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      canSubmit: false
    };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
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
        <Formsy.Form ref="form" className="horizontal" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <Input formNoValidate required name="name" label="Name" placeholder="Name" value={this.props.<%= name %>.name || ''} />
          <div>
            <button type="button" onClick={this.resetForm}>Reset</button>
            &nbsp;
            <input type="submit" disabled={!this.state.canSubmit} value={this.props.saving ? 'Saving... ' : 'Save'} />
            &nbsp;
            <Link to="/app/<%= pluralizedName %>">Cancel</Link>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

<%= ucName %>Form.propTypes = {
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  <%= name %>: PropTypes.object.isRequired
};

export default <%= ucName %>Form;
