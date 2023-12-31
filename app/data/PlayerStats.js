import axios, { Axios } from "axios";


export default function Player(playerName) {
    this.playerName = playerName;
    let playerId = null;
    let stats = null;

    const getPlayerId = async () => {
        try {
            const response = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`);
            playerId = response.data.data[0]?.id;
        } catch (error) {
            console.error('Error fetching player ID:', error);
        }
    };

    const setStats = async () => {
        try {
            const response = await axios.get(`https://www.balldontlie.io/api/v1/stats?seasons[]=2023&player_ids[]=${playerId}&per_page=100`);
            stats = response.data.data;
        } catch (error) {
            console.error('Error fetching player stats:', error);
        }
    };

    this.getMultipleStats = async function(statsList){
        const filteredData = statsList.filter(sublist => sublist[1] !== '');
        
        const mappedList = await Promise.all(filteredData.map(async (lst) => {
            const playerNameFormatted = playerName.split("_").join(" ");

            const stat5 = await this.getStats(lst[0], '5', 'left', lst[1]);
            const stat10 = await this.getStats(lst[0], '10', 'left', lst[1]);
            const statSeason = await this.getStats(lst[0], 'season', 'left', lst[1]);
    
            return [playerNameFormatted, lst[0], lst[1], stat5, stat10, statSeason];
        }));
        return mappedList;
    };



    this.setStats = async function(){
        await getPlayerId(); // Wait for setStats to complete and populate stats
        await setStats();
    };

    this.getStats = async function(stat, games, overUnder, total) {
        let newList;
        let filterList;

        if (!stats) {
            console.error('Stats data not available.');
            return ["NA", "NA"];
        }
        let statList = getStatsHelper(stat);

        if (statList.length < games) {
            return ["NA", "NA"]
        }

        if (games === 'season'){
            newList = statList;
        } else {
            newList = statList.slice(-games)
        }

        let ogLength = newList.length;

        if (overUnder === 'left'){
            filterList = newList.filter((value) => value > total);
        } else {
            filterList = newList.filter((value) => value < total);
        }
        
        let newLength = filterList.length;

        let fraction = `${newLength} / ${ogLength}`;
        
        let per = `${((newLength / ogLength) * 100).toFixed(2)}%`;

        return [fraction, per];
        
        
    };

    let getStatsHelper = function(stat) {
        switch (stat) {
            case "Points":
                return stats.filter(game => game["min"] !== "00").map(game => game["pts"]);
            case "Assists":
                return stats.filter(game => game["min"] !== "00").map(game => game["ast"]);
            case "Rebounds":
                return stats.filter(game => game["min"] !== "00").map(game => game["reb"]);
            case "Steals":
                return stats.filter(game => game["min"] !== "00").map(game => game["stl"]);
            case "Blocks":
                return stats.filter(game => game["min"] !== "00").map(game => game["blk"]);
            case "Threes Made":
                return stats.filter(game => game["min"] !== "00").map(game => game["fg3m"]);
            case "Points + Assists":
                return stats.filter(game => game["min"] !== "00").map(game => game["pts"] + game["ast"]);
            case "Points + Rebounds":
                return stats.filter(game => game["min"] !== "00").map(game => game["pts"] + game["reb"]);
            case "Rebounds + Assists":
                return stats.filter(game => game["min"] !== "00").map(game => game["reb"] + game["ast"]);
            case "Points + Assists + Rebounds":
                return stats.filter(game => game["min"] !== "00").map(game => game["pts"] + game["ast"] + game["reb"]);
            case "Steals + Blocks":
                return stats.filter(game => game["min"] !== "00").map(game => game["stl"] + game["blk"]);
            
        }
    };


}