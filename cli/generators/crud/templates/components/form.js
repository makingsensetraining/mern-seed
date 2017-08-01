import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import autoBind from 'react-autobind';

class <%= ucName %>Form extends Component {
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
          <Input formNoValidate required name="name" label="Name" placeholder="Name" value={this.props.<%= name %>.name || ''} />
          <div>
            <button type="button" onClick={this.resetForm}>Reset</button>
            &nbsp;
            <input type="submit" disabled={!this.props.canSubmit} value={this.props.saving ? 'Saving... ' : 'Save'} />
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
  canSubmit: PropTypes.bool.isRequired,
  enableSubmit: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
  <%= name %>: PropTypes.object.isRequired
};

export default <%= ucName %>Form;
