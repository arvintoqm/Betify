import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PickSorter from '../data/BestPicksSorter';
import { usePickSorter } from '../data/PickSorterContext';

export default function BestBetsView({ navigation }) {
  const pickSorter = usePickSorter();
  const [statlist, setStatlist] = useState([]);
  const [sortBy, setSortBy] = useState('Season');

  const statDict = {
    "Points": 'Pts',
    "Assists": 'Ast',
    "Rebounds": 'Reb',
    "Steals": 'Stl',
    "Blocks": 'Blk',
    "Threes Made": 'FG3M',
    "Points + Assists": 'P + A',
    "Points + Rebounds": 'P + R',
    "Rebounds + Assists": 'R + A',
    "Points + Assists + Rebounds": 'P + R + A',
    "Steals + Blocks": 'S + B',

  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const picks = await pickSorter.getAllPicks();
        setStatlist([...picks]);
      };
  
      fetchData();
  
      return () => {
        // Cleanup if needed
      };
    }, [pickSorter])
  );

  
  const sortButtons = ['L5', 'L10', 'Season'];

  const handleSortPress = async (button) => {
    // Implement your sorting logic here based on the selected button
    if (button === 'L5') {
        await pickSorter.changeSortBy(3);
    } else if (button === 'L10') {
        await pickSorter.changeSortBy(4);
    } else if (button === 'Season') {
        await pickSorter.changeSortBy(5);
    }

    const picks = await pickSorter.getAllPicks();
    setStatlist([...picks]);

    // Update the sortBy state
    setSortBy(button);
  };

  const renderSortButton = (button) => {
    const isSelected = sortBy === button;
    return (
      <TouchableOpacity
        key={button}
        style={[styles.sortButton, isSelected && styles.selectedSortButton]}
        onPress={() => handleSortPress(button)}
      >
        <Text style={styles.sortButtonText}>{button}</Text>
      </TouchableOpacity>
    );
  };


  const item = ({item}) => {
    return(
        <View style={{flexDirection: 'row'}}>
            <View style={[styles.flatListView, styles.statsContainer]} ellipsizeMode="tail">
                <Text style={[styles.playerText, {width: 79}]}>
                    {item[0]}
                </Text>
            </View>
            <View style={styles.flatListView}>
                <Text style={styles.text}>
                    {statDict[item[1]]}
                </Text>
            </View>
            <View style={styles.flatListView}>
                <Text style={styles.text}>
                    {item[2]}
                </Text>
            </View>
            <View style={styles.flatListView}>
                <Text style={styles.text}>
                    {item[3][0]}
                </Text>
                <Text style={styles.text}>
                    {item[3][1]}
                </Text>
            </View>
            <View style={styles.flatListView}>
            <Text style={styles.text}>
                    {item[4][0]}
                </Text>
                <Text style={styles.text}>
                    {item[4][1]}
                </Text>
            </View>
            <View style={styles.flatListView}>
            <Text style={styles.text}>
                    {item[5][0]}
                </Text>
                <Text style={styles.text}>
                    {item[5][1]}
                </Text>
            </View>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.sortContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <View style={styles.sortButtonsContainer}>
            {sortButtons.map(renderSortButton)}
          </View>
        </View>

        <View style={styles.flatListContainer}> 
            

            <View style={{flexDirection: 'row'}}>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        Player
                    </Text>
                </View>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        Stat
                    </Text>
                </View>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        Line
                    </Text>
                </View>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        L5
                    </Text>
                </View>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        L10
                    </Text>
                </View>
                <View style={styles.flatListView}>
                    <Text style={styles.headerText}>
                        Season
                    </Text>
                </View>
            </View>
            
            <View style={styles.separator} />

            <FlatList
            key={statlist.length}
            data={statlist}
            renderItem={item}
            keyExtractor={(item,index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            >
            </FlatList>
        </View>
       

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Teams", { screenType: "Stats Picker" })}
        >
          <Text style={styles.addButtonText}>Add a bet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={async () => {
            await pickSorter.clearAllPicks();
            const picks = await pickSorter.getAllPicks();
            setStatlist([...picks]);
          }}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listContainer: {
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    marginTop: 10, // Add margin between the list and the button
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 100, // Adjust the width as needed
  },
  text: {
    color: '#fff',
    fontSize: 16,
    width:100,
  },
  flatListView: {
    width: '16.5%',
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray', // You can adjust the color as needed
    marginVertical: 8, // You can adjust the margin as needed
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sortByText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  sortButton: {
    backgroundColor: '#D3D3D3', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedSortButton: {
    backgroundColor: 'green', 
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
