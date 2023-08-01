import { useEffect, useState } from "react";

const API_URL = "https://ergast.com/api/f1/current/driverStandings.json";

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [season, setSeason] = useState("");
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                setSeason(data.MRData.StandingsTable.season);
                // console.log(drivers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    let driversNames = drivers.map(data => (
            <p key={data.Driver.driverId}>
                {data.positionText}. {data.Driver.givenName} {data.Driver.familyName}
            </p>
        )
    )
    return (
        <>
            <h1>Drivers Standings for the {season} season</h1>
            {driversNames}
        </>
    );
}

export default Drivers;