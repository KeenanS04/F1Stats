import { useEffect, useState } from "react";
import AgTable from "../components/AgTable";
import Chart from "../components/Chart";

function Drivers() {
    const [season, setSeason] = useState(new Date().getFullYear());
    const [driverData, setDriverData] = useState([]);
    const [rounds, setRounds] = useState([]);
    const options = [];
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Pos', field: 'position', width: 100 },
        { headerName: 'Name', field: 'driver' },
        { headerName: 'Team', field: 'team', width: 150 },
        // { headerName: 'Nationality', field: 'nationality', width: 150},
        { headerName: 'Points', field: 'points', sortable: true },
        { headerName: 'Wins', field: 'wins', sortable: true },
    ]);
    let [tableRows, setTableRows] = useState([]);

    // create the options for the select
    for (let year = new Date().getFullYear(); year >= 1950; year--) {
        options.push(<option value={year} key={year}>{year}</option>);
    }

    useEffect(() => {
        console.log("fetching table data")
        getTableDate(season, setDriverData);
        getChartData(season, setRounds);
    }, [season]);

    useEffect(() => {
        setTableRows(driverData.map(data => ({
            id: data.Driver.driverId,
            driver: data.Driver.givenName + " " + data.Driver.familyName,
            team: data.Constructors[0].name,
            nationality: data.Driver.nationality,
            points: parseInt(data.points),
            position: parseInt(data.positionText),
            wins: parseInt(data.wins)
        }
        )
        ))
    }, [driverData])

    const handleChange = (e) => {
        setSeason(e.target.value);
    }

    return (
        <div className="drivers">
            <div className="drivers--titles">
                <h1 className="drivers--text">Driver Standings</h1>
                <p className="drivers--text">Season: {season}</p>
                <select name="season" className="drivers--text" id="season" value={season} onChange={handleChange}>
                    {options}
                </select>
            </div>
            <div className="drivers--data">
                <AgTable 
                    rows={tableRows} 
                    cols={columnDefs}  
                />
                <Chart 
                    roundsData={rounds}  
                />
            </div>
        </div>
    );
}

export default Drivers;

function getTableDate(season, setDriverData) {
    fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`)
        .then((response) => response.json())
        .then((data) => {
            setDriverData(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function getChartData(season, setRounds) {
    const fetchData = async () => {
        console.log("fecthing chart data")
        let promises = [];
        for (let i = 1; i <= 23; i++) {
            promises.push(fetch(`https://ergast.com/api/f1/${season}/${i}/driverStandings.json`)
                .then(response => response.json())
                .then(data => {
                    if (data.MRData.StandingsTable.StandingsLists.length > 0) {
                        let driversAndPoints = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
                            driver: driver.Driver.givenName + " " + driver.Driver.familyName,
                            points: parseInt(driver.points),
                            constructor: driver.Constructors[0].name
                        }));
                        let drivers = driversAndPoints.reduce((obj, driver) => {
                            obj[driver.driver] = driver.points;
                            return obj;
                        }, {});
                        return {
                            round: i,
                            ...drivers
                        };
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
            );
        }
        let newRounds = await Promise.all(promises);
        console.log("setting newRounds")
        setRounds(newRounds.filter(round => round !== undefined).sort((a, b) => a.round - b.round));
        console.log("rounds set")
    };
    fetchData();
}
