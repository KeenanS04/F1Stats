import { useEffect, useState } from "react";
import AgTable from "../components/AgTable";
import Chart from "../components/Chart";

function Constructors() {
    const [season, setSeason] = useState(new Date().getFullYear());
    const [constructorData, setConstructorData] = useState([]);
    const [rounds, setRounds] = useState([]);
    const options = [];
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Pos', field: 'position', width: 100 },
        { headerName: 'Name', field: 'constructor' },
        { headerName: 'Nationality', field: 'nationality', width: 150},
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
        getTableDate(season, setConstructorData);
        getChartData(season, setRounds);
    }, [season]);

    useEffect(() => {
        setTableRows(constructorData.map(data => ({
            id: data.Constructor.constructorId,
            constructor: data.Constructor.name,
            nationality: data.Constructor.nationality,
            points: parseInt(data.points),
            position: parseInt(data.positionText),
            wins: parseInt(data.wins)
        }
        )
        ))
    }, [constructorData])

    const handleChange = (e) => {
        setSeason(e.target.value);
    }

    return (
        <div className="constructors">
            <div className="titles">
                <h1 className="text">Constructors Standings</h1>
                <p className="text">Season: {season}</p>
                <select name="season" className="text" id="season" value={season} onChange={handleChange}>
                    {options}
                </select>
            </div>
            <div className="data">
                <div className="data--table">
                    <AgTable 
                        rows={tableRows} 
                        cols={columnDefs}  
                    />
                </div>
                <Chart 
                    roundsData={rounds}  
                />
            </div>
        </div>
    );
}

export default Constructors;

function getTableDate(season, setConstructorData) {
    fetch(`https://ergast.com/api/f1/${season}/constructorStandings.json`)
        .then((response) => response.json())
        .then((data) => {
            setConstructorData(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
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
            promises.push(fetch(`https://ergast.com/api/f1/${season}/${i}/constructorStandings.json`)
                .then(response => response.json())
                .then(data => {
                    if (data.MRData.StandingsTable.StandingsLists.length > 0) {
                        let constructorsAndPoints = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(constructor => ({
                            constructor: constructor.Constructor.name,
                            points: parseInt(constructor.points),
                        }));
                        let constructors = constructorsAndPoints.reduce((obj, constructor) => {
                            obj[constructor.constructor] = constructor.points;
                            return obj;
                        }, {});
                        return {
                            round: i,
                            ...constructors
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
        console.log(newRounds)
        console.log("rounds set")
    };
    fetchData();
}
