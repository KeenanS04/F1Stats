import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function AgTable(data) {
    console.log(data.data);

    const [rowData, setRowData] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Pos', field: 'position', width: 100},
        { headerName: 'Name', field: 'driver'},
        { headerName: 'Team', field: 'team', width: 150},
        { headerName: 'Nationality', field: 'nationality', width: 150},
        { headerName: 'Points', field: 'points', sortable: true},
        { headerName: 'Wins', field: 'wins', sortable: true},
    ]);

    useEffect(() => {
        setRowData(data.data);
    }, [data.data]);

    return (
        <div className="ag-theme-alpine" style={{ height: 890, width: '50vw'}}>
            <AgGridReact 
                rowData={rowData} 
                columnDefs={columnDefs}
            >
            </AgGridReact>
        </div>
    );
}
