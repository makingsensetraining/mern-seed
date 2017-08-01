import React, {PropTypes} from 'react';
import {DropModal} from 'boron';
import autoBind from 'react-autobind';

class Modal extends React.Component {
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
                <button className="btn btn-primary" type="button" onClick={this.close}>Close</button>
                {footer}
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
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  footer: PropTypes.string,
  close: PropTypes.func,
  modal: PropTypes.object.isRequired
};

export default Modal;
