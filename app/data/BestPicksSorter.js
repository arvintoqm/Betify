
export default function PickSorter() {
    allPicks = [];
    sortBy = 3;


    this.addPicks = (picks) => {
        allPicks.concat(picks);
    };

    this.changeSortBy = (value) => {
        sortBy = value;
    };

    this.getAllPicks = () => {
        return allPicks;
    };

    const compareByPercentage = (a, b) => {
        const percentageA = parseFloat(a[sortBy][1].replace('%', ''));
        const percentageB = parseFloat(b[sortBy][1].replace('%', ''));
      
        return percentageB - percentageA; // Sort in descending order
    };

    this.sort = async () => {
        let newOrder = await allPicks.sort(compareByPercentage);
        allPicks = newOrder;
    }

}   