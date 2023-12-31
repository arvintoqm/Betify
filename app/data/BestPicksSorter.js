
export default function PickSorter() {
    allPicks = [];
    sortBy = 5;


    this.addPicks = (picks) => {
        allPicks = allPicks.concat(picks);
    };

    this.changeSortBy = (value) => {
        sortBy = value;
    };

    this.getAllPicks = () => {
        return allPicks;
    };

    this.clearAllPicks = () => {
        allPicks = [];
    };

    this.changeSortBy = async (number) => {
        sortBy = number;
        await this.sort();
    };

    const compareByPercentage = (a, b) => {
        const percentageA = parseFloat(a[sortBy][1].replace('%', ''));
        const percentageB = parseFloat(b[sortBy][1].replace('%', ''));
      
        return percentageB - percentageA; // Sort in descending order
    };

    this.sort = async () => {
        let newOrder = await allPicks.sort(compareByPercentage);
        allPicks = await newOrder;
    }

}   