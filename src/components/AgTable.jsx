import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function AgTable(props) {
    let rowData = props.rows;
    let colData = props.cols;
    return (
        <div className="ag-theme-alpine" style={{ height: 1000, width: 800 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colData}
            >
            </AgGridReact>
        </div>
    );
}
