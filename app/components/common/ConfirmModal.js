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
                                <button className="btn btn-success" type="button" onClick={this.confirm}>Confirm</button>
                                <button className="btn btn-default" type="button" onClick={this.hide}>Cancel</button>
                                {this.props.footer}
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
    size: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    footer: PropTypes.string,
    confirm: PropTypes.func.isRequired
};

export default ConfirmModal;
