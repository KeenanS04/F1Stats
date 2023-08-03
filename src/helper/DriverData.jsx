class DriverData {

    constructor() {
        this.drivers = [];
        this.season = "";
    }

    getDrivers() {
        return this.drivers;
    }

    getSeason() {
        return this.season;
    }

    getTableData() {
        return drivers.map(data => ({
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
    }

    fetchDrivers(season) {
        fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`)
            .then((response) => response.json())
            .then((data) => {
                drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                season = data.MRData.StandingsTable.season;
                // console.log(drivers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

}