import React from 'react';

const CellTempleteOne = (props) => {
    let date = props.date
    if (date.getDay() === 0 || date.getDay() === 6) {
        return <div className="e-cell-content weekend-cell"></div>;
    }
    return <div className="e-cell-content"></div>;
};

export default CellTempleteOne;
