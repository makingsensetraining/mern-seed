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
      <div>
        <DropModal ref="modal">
          <div className={`modal-${this.props.size}`}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.hide}>×</button>
                <h2 className="modal-title">{this.props.title}</h2>
              </div>
              <div className="modal-body">
                {this.props.body}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" type="button" onClick={this.hide}>Close</button>
                {this.props.footer}
              </div>
            </div>
          </div>
        </DropModal>
      </div>
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
