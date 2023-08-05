import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Chart(props) {
    let year = props.year;
    let [rounds, setRounds] = useState([]);
    let [lines, setLines] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            console.log("fecthing chart data")
            let promises = [];
            for (let i = 1; i <= 23; i++) {
                promises.push(fetch(`https://ergast.com/api/f1/${year}/${i}/driverStandings.json`)
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
    }, [year]);

    //sort rounds by round number whenever rounds changes and update chartData
    useEffect(() => {
        console.log(rounds);
    }, [rounds]);

    let driverNames = rounds.length > 0 ? Object.keys(rounds[0]) : [];
    lines = driverNames.map(name => {
        if (name !== "round") {
            let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            return <Line key={name} type="monotone" dataKey={name} stroke={color} />;
        }
        return null;
    });


    // console.log(lines)
    return (
        <LineChart width={800} height={600} data={rounds}>
            {lines}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="round" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );
}