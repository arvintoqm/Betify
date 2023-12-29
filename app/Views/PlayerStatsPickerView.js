import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet, Text, Image, TextInput } from 'react-native';
import Player from '../data/PlayerStats';
import PickSorter from '../data/BestPicksSorter';

export default function PlayerStatsPickerView({ navigation, route }) {

    const { playerName, picture } = route.params;

    const player = new Player(playerName.split(" ").join("_"));

    const [points, setPoints] = useState('');
    const [assists, setAssists] = useState('');
    const [rebounds, setRebounds] = useState('');
    const [steals, setSteals] = useState('');
    const [blocks, setBlocks] = useState('');
    const [threeMade, setThreesMade] = useState('');
    const [pointsAssists, setPointsAssists] = useState('');
    const [pointsRebounds, setPointsRebounds] = useState('');
    const [reboundsAssists, setReboundsAssists] = useState('');
    const [pointsAssistsRebounds, setPointsAssistsRebounds] = useState('');
    const [stealsBlocks, setStealsBlocks] = useState('');

    const handleButtonPress = async () => {
        try {
            await player.setStats();

            // Use async/await to wait for the promises to resolve
            let lst1 = await player.getMultipleStats([["Points", points], 
            ["Assists", assists], ["Rebounds", rebounds], ["Steals", steals], 
            ["Blocks", blocks], ["Threes Made", threeMade], ["Points + Assists", pointsAssists], 
            ["Points + Rebounds", pointsRebounds], ["Rebounds + Assists", reboundsAssists], 
            ["Points + Assists + Rebounds", pointsAssistsRebounds], ["Steals + Blocks", stealsBlocks],])

            await pickSorter.addPicks(lst1);

            await pickSorter.sort();

            console.log(pickSorter.getAllPicks());
            
            
        } catch (error) {
          console.error('Error fetching player stats:', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.textbox}>
                    <Text style={styles.text}>
                        {playerName}
                    </Text>
                </View>

                <View style={styles.logobox}>
                    <Image style={styles.logo} source={{uri: picture}}/>
                </View>
                
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Points:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={points}
                        onChangeText={setPoints}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Assists:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={assists}
                        onChangeText={setAssists}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Rebounds:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={rebounds}
                        onChangeText={setRebounds}
                        />
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>Steals:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={steals}
                        onChangeText={setSteals}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Blocks:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={blocks}
                        onChangeText={setBlocks}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Threes Made:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={threeMade}
                        onChangeText={setThreesMade}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Points + Assists:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={pointsAssists}
                        onChangeText={setPointsAssists}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Points + Rebounds:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={pointsRebounds}
                        onChangeText={setPointsRebounds}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Rebounds + Assists:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={reboundsAssists}
                        onChangeText={setReboundsAssists}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Points + Assists + Rebounds:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={pointsAssistsRebounds}
                        onChangeText={setPointsAssistsRebounds}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Steals + Blocks:</Text>
                        <TextInput
                        maxLength={4}
                        style={styles.input}
                        keyboardType="numeric"
                        value={stealsBlocks}
                        onChangeText={setStealsBlocks}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={handleButtonPress}>
                    <View style={styles.box}>
                        <Text style={styles.boxText}>Continue</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      text: {
        color: '#fff',
        fontSize: 40,
        margin: 10,
        marginBottom: 0,
      },
      logobox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        marginTop: 0, 
      },
      textbox:{
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
      },
      column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      label: {
        width: 250, 
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        marginRight: 8,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',  // Text color
        backgroundColor: '#f2f2f2',  // Background color
        borderRadius: 4,
        padding: 8,
        width: 100,
      },
      box: {
        width: 200,
        height: 100,
        alignItems: 'center',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'blue',
        alignSelf: 'center',
      },
      boxText: {
        color: '#fff',
        fontSize: 30,
        margin: 10,
      },
})