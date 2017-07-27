import React, { PropTypes, Component } from 'react';
import {DropModal} from 'boron';
import autoBind from 'react-autobind';

class ConfirmModal extends Component {
  constructor(props, context){
    super(props, context);

    autoBind(this);
  }

  componentWillUpdate(nextProps) {
    const { id, modal } = nextProps;

    if (modal !== this.props.modal) {
      if (id === modal.id && modal.show) {
        this.refs.modal.show();
      } else {
        this.refs.modal.hide();
      }
    }
  }

  confirm(){
    this.close();
    this.props.confirm();
  }

  close () {
    const { close, id } = this.props;
    close(id);
  }

  render() {
    const { id, size, title, body, footer } = this.props;
    return (
      <div id={id}>
        <DropModal ref="modal">
          <div className={`modal-${size}`}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.close}>×</button>
                <h2 className="modal-title">{title}</h2>
              </div>
              <div className="modal-body">
                {body}
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" type="button" onClick={this.confirm}>Confirm</button>
                <button className="btn btn-default" type="button" onClick={this.close}>Cancel</button>
                {footer}
              </div>
            </div>
          </div>
        </DropModal>
      </div>
    );

  }
}

ConfirmModal.defaultProps = {
  size: 'md'
};

ConfirmModal.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  footer: PropTypes.string,
  confirm: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired
};

export default ConfirmModal;
