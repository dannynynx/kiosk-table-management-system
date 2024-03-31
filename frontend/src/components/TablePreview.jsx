import React from 'react';
import './TablePreview.css';

const TablePreview = ({ tableNumber, onClick, colour, tablePicture }) => {
    return (
        <button className='table-preview' onClick={onClick} style={{'background-color': colour}}>
            <img src={tablePicture} className='table-image' alt='Table Icon'></img>
            <h2 className='table-text-style'>Table #{tableNumber}</h2>
        </button>
    );
};

export default TablePreview;