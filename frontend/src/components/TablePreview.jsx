import './TablePreview.css';
import tableIcon from '../assets/table-icon.svg';
import PropTypes from "prop-types";

const TablePreview = ({ tableNumber, onClick, colour, tablePicture }) => {
    return (
        <button className='table-preview' onClick={onClick} style={{'backgroundColor': colour}}>
            <img src={tablePicture} className='table-image' alt='Table Icon'></img>
            <h2 className='table-text-style'>Table #{tableNumber}</h2>
        </button>
    );
};

TablePreview.propTypes = {
    tableNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    colour: PropTypes.string.isRequired,
}

export default TablePreview;