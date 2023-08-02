import { useEffect, useState } from "react";
import AgTable from "../components/AgTable";

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [season, setSeason] = useState("");
    useEffect(() => {
        fetch("https://ergast.com/api/f1/2020/driverStandings.json")
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                setSeason(data.MRData.StandingsTable.season);
                console.log("loaded");
                // console.log(drivers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

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
    return (
        <>
            <h1>Drivers Standings for the {season} season</h1>
            <AgTable data={driverData} />
        </>
    );
}

export default Drivers;