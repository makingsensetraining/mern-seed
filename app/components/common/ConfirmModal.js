import React, {PropTypes} from 'react';
import {DropModal} from 'boron';

class ConfirmModal extends React.Component {
  constructor(props, context){
    super(props, context);

    this.open = this.open.bind(this);
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  open(){
    this.refs.modal.show();
  }

  hide(){
    this.refs.modal.hide();
  }

  confirm(){
    this.hide();
    this.props.confirm();
  }

  render() {
    return (
      <DropModal ref="modal">
        <div>
          <button type="button" onClick={this.hide}>×</button>
          <h2>{this.props.title}</h2>
        </div>
        <div>
          {this.props.body}
        </div>
        <div>
          <button type="button" onClick={this.confirm}>Confirm</button>
          <button type="button" onClick={this.hide}>Cancel</button>
          {this.props.footer}
        </div>
      </DropModal>
    );

  }
}

ConfirmModal.defaultProps = {
  size: 'md'
};

ConfirmModal.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  footer: PropTypes.string,
  confirm: PropTypes.func.isRequired
};

export default ConfirmModal;
