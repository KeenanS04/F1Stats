import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function AgTable(props) {
    const [drivers, setDrivers] = useState([]);
    const [rowData, setRowData] = useState([]);
    const year = props.year;

    useEffect(() => {
        console.log("fetching table data")
        fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [year]);

    useEffect(() => {
        let driverData = drivers.map(data => ({
            id: data.Driver.driverId,
            driver: data.Driver.givenName + " " + data.Driver.familyName,
            team: data.Constructors[0].name,
            nationality: data.Driver.nationality,
            points: parseInt(data.points),
            position: parseInt(data.positionText),
            wins: parseInt(data.wins)
        }
        )
        )
        setRowData(driverData);
    }, [drivers]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Pos', field: 'position', width: 100 },
        { headerName: 'Name', field: 'driver' },
        { headerName: 'Team', field: 'team', width: 150 },
        // { headerName: 'Nationality', field: 'nationality', width: 150},
        { headerName: 'Points', field: 'points', sortable: true },
        { headerName: 'Wins', field: 'wins', sortable: true },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 890, width: 800 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
            >
            </AgGridReact>
        </div>
    );
}
