import React, {PropTypes} from 'react';
import {DropModal} from 'boron';

class Modal extends React.Component {
  constructor(props, context){
    super(props, context);

    this.open = this.open.bind(this);
    this.hide = this.hide.bind(this);
  }

  open(){
    this.refs.modal.show();
  }

  hide(){
    this.refs.modal.hide();
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
            <button type="button" onClick={this.hide}>Close</button>
            {this.props.footer}
          </div>
        </DropModal>
    );

  }
}

Modal.defaultProps = {
  size: 'md'
};

Modal.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  footer: PropTypes.string
};

export default Modal;
