import { useState } from "react";
import AgTable from "../components/AgTable";
import Chart from "../components/Chart";

function Drivers() {
    const [season, setSeason] = useState(new Date().getFullYear());
    const options = [];

    // create the options for the select
    for (let year = new Date().getFullYear(); year >= 1950; year--) {
        options.push(<option value={year} key={year}>{year}</option>);
    }

    const handleChange = (e) => {
        setSeason(e.target.value);
    }

    return (
        <div>
            <h1>Driver Standings</h1>
            <p>Season: {season}</p>
            <select name="season" id="season" value={season} onChange={handleChange}>
                {options}
            </select>
            <div className="drivers-data">
                <AgTable year={season} />
                <Chart year={season} />
            </div>
        </div>
    );
}

export default Drivers;