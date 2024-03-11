import './TablePreview.css'
import tableIcon from '../assets/table-icon.svg';

const TablePreview = ({ tableNumber }) => {
    return (
        <div className='table-preview'>
            <img src={tableIcon} className='table-image' alt='Table Icon'/>
            <h2 className='table-text-style'>Table #{tableNumber}</h2>
        </div>
    );
};

export default TablePreview;