import React from 'react';
import './TablePreview.css';
import tableIcon from '../assets/table-icon.svg';

const TablePreview = ({ tableNumber, onClick }) => {
    return (
        <button className='table-preview' onClick={onClick}>
            <img src={tableIcon} className='table-image' alt='Table Icon'/>
            <h2 className='table-text-style'>Table #{tableNumber}</h2>
        </button>
    );
};

export default TablePreview;