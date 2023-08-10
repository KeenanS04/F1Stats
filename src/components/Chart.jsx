import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Chart(props) {
    let rounds = props.roundsData;
    let [lines, setLines] = useState([]);

    useEffect(() => {
        let keys = rounds.length > 0 ? Object.keys(rounds[0]) : [];
        setLines(keys.map(name => {
            if (name !== "round") {
                let color = `rgb(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)})`;
                return <Line key={name} type="monotone" dataKey={name} stroke={color} />;
            }
            return null;
        }));
    }, [rounds]);

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