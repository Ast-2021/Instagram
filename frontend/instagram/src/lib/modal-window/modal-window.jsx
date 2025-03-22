import PropTypes from 'prop-types';
import './modal-window-style.css'

const ModalWindow = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button> 
                {children}
            </div>
        </div>
    );
};

ModalWindow.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default ModalWindow;