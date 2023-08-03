import { useEffect, useState } from "react";
import AgTable from "../components/AgTable";

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [season, setSeason] = useState(new Date().getFullYear());
    const options = [];

    for (let year = new Date().getFullYear(); year >= 1950; year--) {
        options.push(<option value={year} key={year}>{year}</option>);
    }
    // get the data from the API
    useEffect(() => {
        fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`)
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                setSeason(data.MRData.StandingsTable.season);
                // console.log(drivers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [season]);

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

    const handleChange = (e) => {
        setSeason(e.target.value);
        fetch(`https://ergast.com/api/f1/${e.target.value}/driverStandings.json`)
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                setSeason(data.MRData.StandingsTable.season);
                // console.log(drivers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    return (
        <>
            <h1>
                Drivers Standings for the
                <select name="season" id="season" onChange={handleChange}>
                    {options}
                </select>
                 Season
            </h1>
            <div className="drivers-data">
                <AgTable data={driverData} />
            </div>
        </>
    );
}

export default Drivers;